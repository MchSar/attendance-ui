import cv2

camera = cv2.VideoCapture(1, cv2.CAP_DSHOW)

while True:

    success, frame = camera.read()

    if not success:
        print("Camera not working")
        break

    cv2.imshow("AI Camera", frame)

    if cv2.waitKey(1) == 27:
        break

camera.release()

cv2.destroyAllWindows()