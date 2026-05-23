from deepface import DeepFace
import cv2

camera = cv2.VideoCapture(0)

while True:

    success, frame = camera.read()

    if not success:
        break

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

        cv2.putText(
                frame,
                name,
                (50, 50),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0,255,0),
                2
            )

    except:
        pass

    cv2.imshow("AI Face Recognition", frame)

    if cv2.waitKey(1) == 27:
        break

camera.release()

cv2.destroyAllWindows()