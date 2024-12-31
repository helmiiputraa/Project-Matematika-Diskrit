from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model and scaler
try:
    model = joblib.load('model/random_forest_model.pkl')
    scaler = joblib.load('model/scaler.pkl')
except Exception as e:
    print(f"Error loading model or scaler: {str(e)}")
    raise

def validate_input(features):
    try:
        if features['Study Hours per Week'] <= 0 or features['Study Hours per Week'] > 168:
            return False, "Jam belajar harus antara 1-168 jam per minggu"
        if features['Attendance Rate'] <= 0 or features['Attendance Rate'] > 100:
            return False, "Persentase kehadiran harus antara 1-100%"
        if features['Previous Grades'] < 0 or features['Previous Grades'] > 100:
            return False, "Nilai sebelumnya harus antara 0-100"
        return True, ""
    except Exception as e:
        return False, f"Error validating input: {str(e)}"

def check_requirements(features):
    # Validasi sesuai standar kurikulum pendidikan Indonesia
    if features['Attendance Rate'] < 90:
        return False, "Kehadiran minimum 90% sesuai standar pendidikan"
    if features['Previous Grades'] < 75:
        return False, "Nilai KKM minimum 75 sesuai standar kurikulum"
    if features['Study Hours per Week'] < 5:
        return False, "Minimal 5 jam belajar per minggu sesuai standar pembelajaran"
    return True, ""

@app.route('/')
def home():
    return jsonify({"message": "Student Performance Prediction API is running"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'Data tidak ditemukan'
            }), 400

        print("Received data:", data)  # Debug print
        
        # Map frontend field names to backend field names
        features = {
            'Study Hours per Week': float(data.get('studyHours', 0)),
            'Attendance Rate': float(data.get('attendanceRate', 0)),
            'Previous Grades': float(data.get('previousGrades', 0)),
            'Participation in Extracurricular Activities': int(data.get('extracurricular', 0)),
            'Parent Education Level': int(data.get('parentEducation', 0))
        }
        
        print("Processed features:", features)  # Debug print
        
        # Validate input ranges
        is_valid, validation_message = validate_input(features)
        if not is_valid:
            return jsonify({
                'status': 'error',
                'message': validation_message
            }), 400
        
        # Check curriculum requirements
        meets_req, req_message = check_requirements(features)
        if not meets_req:
            return jsonify({
                'status': 'warning',  # Changed from 'fail' to 'warning'
                'prediction': 'Tidak Lulus',
                'message': req_message
            })
        
        # Scale features for prediction
        features_df = pd.DataFrame([features])
        features_scaled = scaler.transform(features_df)
        
        # Make prediction
        prediction = model.predict(features_scaled)
        probability = model.predict_proba(features_scaled)[0]
        
        # Prepare detailed result
        result = {
            'status': 'success',
            'prediction': 'Lulus' if prediction[0] == 1 else 'Tidak Lulus',
            'probability': {
                'lulus': float(probability[1]),
                'tidak_lulus': float(probability[0])
            }
        }
        
        print("Prediction result:", result)  # Debug print
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in prediction: {str(e)}")  # Debug print
        return jsonify({
            'status': 'error',
            'message': f'Terjadi kesalahan dalam pemrosesan: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5000)