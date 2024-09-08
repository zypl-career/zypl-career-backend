from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pyreadstat
import pickle
import catboost
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserInput(BaseModel):
    answers: dict


data = pd.read_csv('last_dataset.csv')
loaded_model = pickle.load(open('last_model.pickle', 'rb'))
trans = pd.read_csv('translations.csv')
df, meta = pyreadstat.read_sav('SAV_format.sav')
variable_values = meta.variable_value_labels

variables = [
    'nom_q_9103f', 'nom_q_9103o', 'nom_q_9103b', 'nom_q_9103k', 'nom_q_9103s', 'nom_q_9103h', 'nom_q_9103c',
    'nom_q_9103l', 'nom_q_9103j', 'nom_q_9103q', 'nom_q_9103m', 'nom_q_9103p', 'nom_q_9103g', 'nom_q_9103e',
    'nom_q_9103r', 'nom_q_9103n', 'nom_q_9103d', 'nom_q_9103i', 'ord_T_q_9101c_1', 'ord_T_q_9101e_7', 'ord_T_q_9101a_7',
    'ord_T_q_9101d_9', 'ord_T_q_9101a_8', 'ord_T_q_9101f_2', 'ord_T_q_9101d_2', 'ord_T_q_9101c_4', 'ord_T_q_9101d_3',
    'ord_T_q_9101c_9', 'ord_T_q_9101d_4', 'ord_T_q_9101c_7', 'ord_T_q_9101b_3', 'ord_T_q_9101b_2', 'ord_T_q_9101e_8',
    'ord_T_q_9101a_5', 'ord_T_q_9101a_3', 'ord_T_q_9101b_6', 'ord_T_q_9101e_4', 'ord_T_q_9101b_7', 'ord_T_q_9101a_4',
    'ord_T_q_9101c_8', 'ord_T_q_9101c_2', 'ord_T_q_9101c_6', 'ord_T_q_9101d_7', 'ord_T_q_9101e_2', 'ord_T_q_9101e_1',
    'ord_T_q_9101d_6', 'ord_T_q_9101d_8', 'ord_T_q_9101b_1', 'ord_T_q_9101b_4'
]
variables.append('nom_q_3222code')
main = ['1110', '1102', '1111', '9301', '9305',
        '9303', '9306', '9308', 'serv_SbjNum']

for i in data.columns:
    for j in main:
        if type(i) == int:
            continue
        if j in i:
            variables.append(i)
            break

for i in data.columns:
    if i not in variables:
        data.drop(i, axis=1, inplace=True)

dic = meta.column_names_to_labels
label = {meta.column_names[i]: meta.column_labels[i]
         for i in range(len(meta.column_names))}
data.drop(['serv_SbjNum', 'nom_q_3222code'], axis=1, inplace=True)

mp = {trans['eng'][i]: trans['tjk'][i] for i in range(len(trans))}
mp_inverse = {trans['tjk'][i]: trans['eng'][i] for i in range(len(trans))}

cluster_labels = {
    1: 'табиӣ ва техникӣ',
    2: 'иқтисод ва география',
    3: 'филология, педагогика ва санъат',
    4: 'ҷомеашиносӣ ва ҳуқуқ',
    5: 'тиб, биология ва варзиш'
}


@app.post("/predict/")
async def predict(user_input: UserInput):
    user_data = pd.DataFrame(user_input.answers, index=[0])

    data_combined = pd.concat([user_data, data], ignore_index=True)

    for i in data_combined.columns:
        if 'nom' in i:
            dummy = pd.get_dummies(data_combined[i], prefix=i)
            data_combined = pd.concat([data_combined, dummy], axis=1)
            data_combined.drop(i, axis=1, inplace=True)

    for i in data_combined.columns:
        if 'ord' in i:
            unique_vals = data_combined[i].unique()
            val_mapping = {val: idx for idx, val in enumerate(unique_vals)}
            data_combined[i] = data_combined[i].map(val_mapping)

    prediction = loaded_model.predict_proba(data_combined.iloc[:1])[0]

    return prediction.tolist()


@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI application for cluster prediction!"}
