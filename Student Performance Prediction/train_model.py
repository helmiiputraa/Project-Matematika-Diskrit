import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

os.makedirs('model', exist_ok=True)

def prepare_data(data):
    data['Study Hours per Week'] = data['Study Hours per Week'].fillna(data['Study Hours per Week'].median())
    data['Attendance Rate'] = data['Attendance Rate'].fillna(data['Attendance Rate'].median())
    data['Previous Grades'] = data['Previous Grades'].fillna(data['Previous Grades'].median())
    return data.dropna()

def create_preprocessors(data):
    le = LabelEncoder()
    scaler = StandardScaler()
    
    data['Participation in Extracurricular Activities'] = le.fit_transform(data['Participation in Extracurricular Activities'])
    data['Parent Education Level'] = le.fit_transform(data['Parent Education Level'])
    data['Passed'] = le.fit_transform(data['Passed'])
    
    joblib.dump(le, os.path.join('model', 'label_encoder.pkl'))
    return data, le, scaler

def prepare_features(data, scaler):
    X = data[['Study Hours per Week', 'Attendance Rate', 'Previous Grades', 
              'Participation in Extracurricular Activities', 'Parent Education Level']]
    y = data['Passed']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    joblib.dump(scaler, os.path.join('model', 'scaler.pkl'))
    
    return X_train_scaled, X_test_scaled, y_train, y_test

def train_model(X_train, y_train):
    rf = RandomForestClassifier(
        n_estimators=1000,
        max_depth=10,
        min_samples_split=2,
        min_samples_leaf=1,
        class_weight={0: 1, 1: 2},
        random_state=42
    )
    rf.fit(X_train, y_train)
    return rf

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    return accuracy, report

def save_model(model):
    joblib.dump(model, os.path.join('model', 'random_forest_model.pkl'))

if __name__ == "__main__":
    data = pd.read_csv('student_performance_prediction.csv')
    data = prepare_data(data)
    data, le, scaler = create_preprocessors(data)
    X_train_scaled, X_test_scaled, y_train, y_test = prepare_features(data, scaler)
    rf_model = train_model(X_train_scaled, y_train)
    accuracy, report = evaluate_model(rf_model, X_test_scaled, y_test)
    
    print("\nModel Performance:")
    print(f"Accuracy: {accuracy*100:.2f}%")
    print("\nDetailed Classification Report:")
    print(report)
    
    save_model(rf_model)
    print("\nModel and preprocessors saved successfully!")