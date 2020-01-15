import face_recognition as face
from PIL import Image, ImageDraw
import cv2, numpy

def find_faces(file):
    image = face.load_image_file(file)
    locations = face.face_locations(image)
    landmarks = face.face_landmarks(image)
    assert not ([locations, landmarks] == [[], []]), "A face could not be identified"

    return [locations, landmarks]

def compare_2_images(file1, file2):
    img1 = face.load_image_file(file1)
    img2 = face.load_image_file(file2)

    img1e = face.face_encodings(img1)
    img2e = face.face_encodings(img2)
    assert (img1e != []) & (img2e != []), "A face could not be identified"

    result = face.compare_faces([img1e[0]], img2e[0])[0]
    return result

def digital_makeup(file):
    image = face.load_image_file(file)
    face_landmarks_list = face.face_landmarks(image)
    pil_image = Image.fromarray(image)
    assert not (face_landmarks_list == []), "A face could not be identified"
    
    for face_landmarks in face_landmarks_list:
        d = ImageDraw.Draw(pil_image, 'RGBA')

        # Make the eyebrows into a nightmare
        d.polygon(face_landmarks['left_eyebrow'], fill=(68, 54, 39, 128))
        d.polygon(face_landmarks['right_eyebrow'], fill=(68, 54, 39, 128))
        d.line(face_landmarks['left_eyebrow'], fill=(68, 54, 39, 150), width=5)
        d.line(face_landmarks['right_eyebrow'], fill=(68, 54, 39, 150), width=5)

        # Gloss the lips
        d.polygon(face_landmarks['top_lip'], fill=(150, 0, 0, 128))
        d.polygon(face_landmarks['bottom_lip'], fill=(150, 0, 0, 128))
        d.line(face_landmarks['top_lip'], fill=(150, 0, 0, 64), width=8)
        d.line(face_landmarks['bottom_lip'], fill=(150, 0, 0, 64), width=8)

        # Sparkle the eyes
        d.polygon(face_landmarks['left_eye'], fill=(255, 255, 255, 30))
        d.polygon(face_landmarks['right_eye'], fill=(255, 255, 255, 30))

        # Apply some eyeliner
        d.line(face_landmarks['left_eye'] + [face_landmarks['left_eye'][0]], fill=(0, 0, 0, 110), width=6)
        d.line(face_landmarks['right_eye'] + [face_landmarks['right_eye'][0]], fill=(0, 0, 0, 110), width=6)

    pil_image.show()

def live_feed():
    def load_sample_image(file):
        image = face.load_image_file(file)
        image_encoding = face.face_encodings(image)[0]
        return image_encoding
    
    video_capture = cv2.VideoCapture(0)

    # known faces, source images
    known_faces = {
        "Jared Turck"       : load_sample_image("jared 2.png"),
        "Jared Turck"       : load_sample_image("jared 3.png"),
        "Shelby Candela"    : load_sample_image("shelby 1.png"),
        "Shelby Candela"    : load_sample_image("shelby 2.png"),
        "Shelby Candela"    : load_sample_image("shelby 3.png"),
        "Shelby Candela"    : load_sample_image("shelby 4.png"),
        "Linda Turck"       : load_sample_image("linda 1.png"),
        "Heath Turck"       : load_sample_image("heath 1.png"),
        "Bill Gates"        : load_sample_image("bill gates 1.png"),
        "The Rock"          : load_sample_image("the rock 1.png")
    }
    
    known_face_encodings = list(known_faces.values())
    known_face_names = list(known_faces.keys())
    face_locations, face_encodings, face_names, process_this_frame  = [], [], [], 0

    while True:
        ret, frame = video_capture.read()
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        if (process_this_frame % 2) == 0:
            face_locations = face.face_locations(rgb_small_frame)
            face_encodings = face.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face.compare_faces(known_face_encodings, face_encoding)
                name = "???"
                
                face_distances = face.face_distance(known_face_encodings, face_encoding)
                best_match_index = numpy.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

                face_names.append(name)

        process_this_frame += 1


        # Display the results
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Draw a box around the face
            top, right, bottom, left = [top*4, right*4, bottom*4, left*4]
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
        
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    video_capture.release()
    cv2.destroyAllWindows()

#print(find_faces("Shelby 1.png"))
#print(compare_2_images("jared 2.png", "jared 3.png"))
#digital_makeup(img[7])
#live_feed()


print('''Menu:\n1. Check if image contains a face
2. compare two images to see if it's the same person
3. Highlight the factial features (landmarks) on a persons face
4. Start a live facial recognition video feed''')

while True:
    user = input(">>> ")
    if (user == "1"):
        try:
            find_faces(input("enter filename of image: "))
            print("This image contains a face!")
        except:
            print("This image does not contain a face!")

    elif (user == "2"):
        name1 = input("enter filename of the first image: ")
        name1 = input("enter filename of the second image: ")
        try:
            compare_2_images(name1, name1)
            print("Match, both images are of the same person!")
        except:
            print("A match was not found!")

    elif (user == "3"):
        digital_makeup(input("enter filename of image: "))

    elif (user == "4"):
        live_feed()

    else:
        print("Invalid Input!")
