import firebase_admin
from firebase_admin import credentials, db


cred = credentials.Certificate(r"C:\Users\Vikto\Desktop\RTU\5_semestris\Projektēšanas laboratorija\prolab-8c87f-firebase-adminsdk-kknrj-d1283fa05e.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://prolab-8c87f-default-rtdb.firebaseio.com'
})