from flask import Flask, jsonify
from flask_cors import CORS
from deepface import DeepFace
import cv2

app = Flask(__name__)

CORS(app)

camera = cv2.VideoCapture(0)

recognized_name = "Unknown"

@app.route("/generate-code")
def generate_code():

    import random

    code = random.randint(100000, 999999)

    return jsonify({
        "code": code
    })

@app.route("/face-status")
def face_status():

    global recognized_name

    success, frame = camera.read()

    if success:

        try:

            result = DeepFace.find(
                img_path=frame,
                db_path="faces",
                enforce_detection=False
            )

            if len(result[0]) > 0:

                name = result[0]['identity'][0]

                name = name.split("\\")[-1]

                name = name.split(".")[0]

                recognized_name = name

        except:
            pass

    return jsonify({
        "student": recognized_name
    })

if __name__ == "__main__":

    app.run(debug=True)