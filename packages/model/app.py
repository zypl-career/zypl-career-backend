##########################
import streamlit as st
import pandas as pd
import pyreadstat
import pickle
import catboost
from catboost import CatBoostClassifier
from sklearn import preprocessing
import matplotlib.pyplot as plt

######################################################################################
## Reading all needed files and choosing needed variables			##
######################################################################################

if 'count' not in st.session_state:

    st.session_state['count'] = 0

    ############################################################
    data = pd.read_csv('last_dataset.csv')

    loaded_model = pickle.load(open('last_model.pickle', 'rb'))

    trans = pd.read_csv('translations.csv')

    df, meta = pyreadstat.read_sav('SAV_format.sav')

    variable_values = meta.variable_value_labels
    ############################################################

    variables = ['nom_q_9103f', 'nom_q_9103o', 'nom_q_9103b', 'nom_q_9103k',
                 'nom_q_9103s', 'nom_q_9103h', 'nom_q_9103c', 'nom_q_9103l', 'nom_q_9103j',
                 'nom_q_9103q', 'nom_q_9103m', 'nom_q_9103p', 'nom_q_9103g', 'nom_q_9103e', 'nom_q_9103r', 'nom_q_9103n', 'nom_q_9103d', 'nom_q_9103i',
                 'ord_T_q_9101c_1', 'ord_T_q_9101e_7', 'ord_T_q_9101a_7', 'ord_T_q_9101d_9', 'ord_T_q_9101a_8', 'ord_T_q_9101f_2', 'ord_T_q_9101d_2',
                 'ord_T_q_9101c_4', 'ord_T_q_9101d_3', 'ord_T_q_9101c_9', 'ord_T_q_9101d_4', 'ord_T_q_9101c_7', 'ord_T_q_9101b_3', 'ord_T_q_9101b_2',
                 'ord_T_q_9101e_8', 'ord_T_q_9101a_5', 'ord_T_q_9101a_3', 'ord_T_q_9101b_6', 'ord_T_q_9101e_4', 'ord_T_q_9101b_7', 'ord_T_q_9101a_4',
                 'ord_T_q_9101c_8', 'ord_T_q_9101c_2', 'ord_T_q_9101c_6', 'ord_T_q_9101d_7', 'ord_T_q_9101e_2', 'ord_T_q_9101e_1', 'ord_T_q_9101d_6',
                 'ord_T_q_9101d_8', 'ord_T_q_9101b_1', 'ord_T_q_9101b_4']

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

    ######################################################################################

    dic = meta.column_names_to_labels  # Dictionary of variables and labels

    label = {}

    for i in range(len(meta.column_names)):
        label[meta.column_names[i]] = meta.column_labels[i]

    data.drop(['serv_SbjNum', 'nom_q_3222code'], axis=1, inplace=True)

    #######################################
    st.session_state['data'] = data
    st.session_state['loaded_model'] = loaded_model
    st.session_state['label'] = label
    st.session_state['trans'] = trans
    st.session_state['variable_values'] = variable_values


## Copying variables which are already read ##
data = st.session_state['data']

loaded_model = st.session_state['loaded_model']
label = st.session_state['label']
trans = st.session_state['trans']
variable_values = st.session_state['variable_values']

######################################################################################
## Collecting user data ( Asking questions )					##
######################################################################################

user_data = pd.DataFrame()

mp, mp_inverse = {}, {}
for i in range(len(trans)):
    mp[trans['eng'][i]] = trans['tjk'][i]
    mp_inverse[trans['tjk'][i]] = trans['eng'][i]


for i in data.columns:
    #################################
    options = []
    for j in variable_values[i]:
        if variable_values[i][j] == 'Yes, more than 10 years' and i == 'nom_q_9306':
            options.append(
                'Official / Registered Employee (NOT YOUR FAMILY BUSINESS)')
            continue
        options.append(variable_values[i][j])
    ##################################
    for j in range(len(options)):
        options[j] = mp[options[j]]
    ##################################

    ans = st.selectbox(label[i], options=options)

    ##################################
    ans = mp_inverse[ans]
    ###################################

    user_data[i] = [ans]

data = pd.concat([user_data, data])

data.index = range(len(data))

######################################################################################
# Performing cluster predictions  					##
######################################################################################

for i in data.columns:
    if ('nom' not in i):
        continue
    ###################
    dummy = pd.get_dummies(data[i], prefix=i)
    data = pd.concat([data, dummy], axis=1)
    data.drop(i, axis=1, inplace=True)


for i in data.columns:
    if ('ord' not in i):
        continue
    a = list(data[i].unique())
    b = list(range(len(a)))
    d = dict(zip(a, b))
    data[i] = data[i].map(d)

# st.write(loaded_model.feature_names_)


####################################
## Predicting and showing results ##
####################################

classes = list(loaded_model.classes_)
output = loaded_model.predict_proba(data[0:1])[0]


cluster_labels = {
    1: 'табиӣ ва техникӣ',
    2: 'иқтисод ва география',
    3: 'филология, педагогика ва санъат',
    4: 'ҷомеашиносӣ ва ҳуқуқ',
    5: 'тиб, биология ва варзиш'
}

for i in range(len(classes)):
    classes[i] = cluster_labels[classes[i]]

# creating the bar plot

fig = plt.figure(figsize=(10, 5))

plt.bar(classes, output, color='green',
        width=0.4)

plt.xlabel("Кластерҳo")
plt.ylabel("Чанд кадар ба шимо мувофик хаст")
plt.title("Чавоби шумо")
plt.xticks(rotation=20)

st.pyplot(plt)
