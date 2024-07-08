from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pyreadstat
import pickle
import matplotlib.pyplot as plt
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust the allowed origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all necessary files
data = pd.read_csv('last_dataset.csv')
loaded_model = pickle.load(open('last_model.pickle', 'rb'))
trans = pd.read_csv('translations.csv')
df, meta = pyreadstat.read_sav('SAV_format.sav')
variable_values = meta.variable_value_labels

# Transcript data (from previous transcript)
nom_q_1102 = ['Man', 'Woman']
nom_q_1111 = ['GBAO', 'Dushanbe',
              'Subordination of the center', 'Sogd', 'Khatlon']
nom_q_1110 = ['City', 'Village']
ord_T_q_9101a_3 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101a_4 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101a_5 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101a_7 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101a_8 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101b_1 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101b_2 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101b_3 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101b_4 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101b_6 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101b_7 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_1 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_2 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_4 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_6 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_7 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_8 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101c_9 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_2 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_3 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_4 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_6 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_7 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_8 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101d_9 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101e_1 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101e_2 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101e_4 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101e_7 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101e_8 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
ord_T_q_9101f_2 = ['Absolutely like', 'It\'s a little weird',
                   'Neutral', 'A little disliked', 'Not at all']
nom_q_9103b = ['Chemistry', 'Photography']
nom_q_9103c = ['Photography', 'Botany']
nom_q_9103d = ['Advice on work', 'Owning a store']
nom_q_9103e = ['Company management', 'Helping families in need']
nom_q_9103f = ['Physical training', 'Doctor']
nom_q_9103g = ['Music', 'Working with wood']
nom_q_9103h = ['Economic sciences', 'Physics']
nom_q_9103i = ['Education', 'Art']
nom_q_9103j = ['Law', 'Artist / Folk Crafts']
nom_q_9103k = ['Child care', 'Stand electronics']
nom_q_9103l = ['Landscaping',
               'Playing in a group, being a member of a music team']
nom_q_9103m = ['Travel agent', 'Mechanic']
nom_q_9103n = ['Work in the office', 'Picture description']
nom_q_9103o = ['Forest', 'The nurse of mercy']
nom_q_9103p = ['Economist', 'Electric']
nom_q_9103q = ['Accounting', 'Geology']
nom_q_9103r = ['Builder', 'Economist']
nom_q_9103s = [
    'Confirmation of a home loan (mortgage)', 'Helping patients in the hospital']
ord_q_9301 = ['Money did not always reach the family, even for food',
              'We had money for food, but buying clothes was a big problem for us',
              'We had enough money for food and clothes, but to buy a refrigerator',
              'Without borrowing money, he could easily buy household appliances',
              'We could have bought a car without any problems, but a house',
              'We didn\'t have any financial problems, we even bought a new house, aha']
nom_q_9303 = ['Official / Registered Employee (NOT YOUR FAMILY BUSINESS)',
              'Unofficial / unregistered employee (NOT YOUR FAMILY BUSINESS)',
              'Working as an employee or assistant in a NON-agricultural business / m',
              'Work as an employee or assistant on a farm (farm, h',
              'Entrepreneur / employee with self-account / private entrepreneur / employer (yes)',
              'Unemployed (ready to work and looking for work)',
              'Doing housework (including caring for children)',
              'Does not work due to limited physical ability or illness',
              'Retired',
              'Dead',
              'I don\'t know / Rejection']
nom_q_9305 = ['Without formal education',
              'General Primary Education (Grades 1-4)',
              'Incomplete general secondary education (Grades 5-9)',
              'Complete general secondary education (Grades 10-11)',
              'Primary vocational education (VET) or secondary vocational education (technical school)',
              'Higher Education (University, Conservatory, Academy) or Postgraduate, d',
              'I don\'t know / Rejection']
nom_q_9306 = ['Yes, more than 10 years',
              'Unofficial / unregistered employee (NOT YOUR FAMILY BUSINESS)',
              'Working as an employee or assistant in a NON-agricultural business / m',
              'Work as an employee or assistant on a farm (farm, h',
              'Entrepreneur / employee with self-account / private entrepreneur / employer (yes)',
              'Unemployed (ready to work and looking for work)',
              'Doing housework (including caring for children)',
              'Does not work due to limited physical ability or illness',
              'Retired',
              'Dead',
              'I don\'t know / Rejection']
nom_q_9308 = ['Without formal education',
              'General primary education (grades 1-4)',
              'Incomplete general secondary education (grades 5-9)',
              'Full secondary education (grades 10-11)',
              'Primary vocational education (vocational school) or secondary vocational (Technical school)',
              'Higher education (University, Conservatory, Academy) or Postgraduate studies, etc',
              'don\'t know / Denial']


# Define variables list including transcript variables
variables = ['nom_q_9103f', 'nom_q_9103o', 'nom_q_9103b', 'nom_q_9103k',
             'nom_q_9103s', 'nom_q_9103h', 'nom_q_9103c', 'nom_q_9103l', 'nom_q_9103j',
             'nom_q_9103q', 'nom_q_9103m', 'nom_q_9103p', 'nom_q_9103g', 'nom_q_9103e', 'nom_q_9103r', 'nom_q_9103n', 'nom_q_9103d', 'nom_q_9103i',
             'ord_T_q_9101c_1', 'ord_T_q_9101e_7', 'ord_T_q_9101a_7', 'ord_T_q_9101d_9', 'ord_T_q_9101a_8', 'ord_T_q_9101f_2', 'ord_T_q_9101d_2',
             'ord_T_q_9101c_4', 'ord_T_q_9101d_3', 'ord_T_q_9101c_9', 'ord_T_q_9101d_4', 'ord_T_q_9101c_7', 'ord_T_q_9101b_3', 'ord_T_q_9101b_2',
             'ord_T_q_9101e_8', 'ord_T_q_9101a_5', 'ord_T_q_9101a_3', 'ord_T_q_9101b_6', 'ord_T_q_9101e_4', 'ord_T_q_9101b_7', 'ord_T_q_9101a_4',
             'ord_T_q_9101c_8', 'ord_T_q_9101c_2', 'ord_T_q_9101c_6', 'ord_T_q_9101d_7', 'ord_T_q_9101e_2', 'ord_T_q_9101e_1', 'ord_T_q_9101d_6',
             'ord_T_q_9101d_8', 'ord_T_q_9101b_1', 'ord_T_q_9101b_4', 'nom_q_1102', 'nom_q_1111', 'nom_q_1110']

# Remove unnecessary columns from 'data'
for i in data.columns:
    if i not in variables:
        data.drop(i, axis=1, inplace=True)

# Dictionary of variables and labels
dic = meta.column_names_to_labels

# User Data Model


class UserData(BaseModel):
    ord_T_q_9101a_3: str
    ord_T_q_9101a_4: str
    ord_T_q_9101a_5: str
    ord_T_q_9101a_7: str
    ord_T_q_9101a_8: str
    ord_T_q_9101b_1: str
    ord_T_q_9101b_2: str
    ord_T_q_9101b_3: str
    ord_T_q_9101b_4: str
    ord_T_q_9101b_6: str
    ord_T_q_9101b_7: str
    ord_T_q_9101c_1: str
    ord_T_q_9101c_2: str
    ord_T_q_9101c_4: str
    ord_T_q_9101c_6: str
    ord_T_q_9101c_7: str
    ord_T_q_9101c_8: str
    ord_T_q_9101c_9: str
    ord_T_q_9101d_2: str
    ord_T_q_9101d_3: str
    ord_T_q_9101d_4: str
    ord_T_q_9101d_6: str
    ord_T_q_9101d_7: str
    ord_T_q_9101d_8: str
    ord_T_q_9101d_9: str
    ord_T_q_9101e_1: str
    ord_T_q_9101e_2: str
    ord_T_q_9101e_4: str
    ord_T_q_9101e_7: str
    ord_T_q_9101e_8: str
    ord_T_q_9101f_2: str
    ord_q_9301: str
    nom_q_1102: str
    nom_q_1111: str
    nom_q_1110: str
    nom_q_9103b: str
    nom_q_9103c: str
    nom_q_9103d: str
    nom_q_9103e: str
    nom_q_9103f: str
    nom_q_9103g: str
    nom_q_9103h: str
    nom_q_9103i: str
    nom_q_9103j: str
    nom_q_9103k: str
    nom_q_9103l: str
    nom_q_9103m: str
    nom_q_9103n: str
    nom_q_9103o: str
    nom_q_9103p: str
    nom_q_9103q: str
    nom_q_9103r: str
    nom_q_9103s: str
    nom_q_9303: str
    nom_q_9305: str
    nom_q_9306: str
    nom_q_9308: str


@app.post("/predict")
async def predict(user_data: UserData):
    user_data_dict = user_data.dict()

    user_data_df = pd.DataFrame([user_data_dict])

    # Preprocess data
    for i in data.columns:
        if 'nom' in i:
            translated_labels = globals().get(i, None)  # Get translated labels dynamically
            if translated_labels:
                user_data_df[i] = user_data_df[i].map(
                    {v: k for k, v in enumerate(translated_labels)})
        elif 'ord' in i:
            unique_values = list(globals()[i])
            user_data_df[i] = user_data_df[i].map(
                {v: k for k, v in enumerate(unique_values)})

    # Predict and prepare the response
    classes = list(loaded_model.classes_)
    output = loaded_model.predict_proba(user_data_df)[0]

    cluster_labels = {
        1: 'табиӣ ва техникӣ',
        2: 'иқтисод ва география',
        3: 'филология, педагогика ва санъат',
        4: 'ҷомеашиносӣ ва ҳуқуқ',
        5: 'тиб, биология ва варзиш'
    }

    response = {cluster_labels[classes[i]]: float(
        output[i]) for i in range(len(classes))}

    # Create bar plot
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.bar(response.keys(), response.values(), color='green', width=0.4)
    ax.set_xlabel("Кластерҳo")
    ax.set_ylabel("Чанд кадар ба шимо мувофик хаст")
    ax.set_title("Чавоби шумо")
    ax.set_xticks(rotation=20)

    # Save the plot to a file
    plt.savefig("plot.png")

    return JSONResponse(content=response)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
