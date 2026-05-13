# Project Report: AI-Powered Monument Identification & Information System

## 1. Project Overview
The **AI-Powered Monument Identification System** is a sophisticated cross-platform application (Web & Mobile) that uses Deep Learning to recognize historical landmarks from images. Beyond identification, it serves as a digital heritage guide, providing historical context, geographical coordinates, and navigation support.

---

## 2. Core Purpose
- **Cultural Preservation:** Digitizing historical knowledge for the next generation.
- **Tourism Enhancement:** Providing an instant, reliable guide for travelers without needing physical handbook.
- **Educational Tool:** Helping students and enthusiasts learn about Indian architecture and history through visual recognition.

---

## 3. High-Level Architecture
The project follows a **Client-Server Architecture**:
1.  **Backend (Central Brain):** A Django-based REST API that hosts the trained Deep Learning model.
2.  **Web Client:** A responsive web interface built with Django Templates and Bootstrap.
3.  **Mobile Client:** A cross-platform mobile app built with React Native and Expo.
4.  **AI Engine:** A TensorFlow/Keras implementation of MobileNetV2 trained on a custom dataset of Indian monuments.

---

## 4. Complete Technical Stack

| Category | Technology |
| :--- | :--- |
| **Backend Language** | Python 3.x |
| **Web Framework** | Django |
| **Mobile Framework** | React Native (Expo) |
| **Database** | SQLite (Lightweight, file-based relational database) |
| **AI/ML Framework** | TensorFlow 2.x, Keras |
| **Static File Serving** | Whitenoise |
| **Image Processing** | Pillow (PIL), OpenCV-Python |
| **Data Analysis** | NumPy, Pandas, Scikit-learn |
| **Visualization** | Matplotlib, Seaborn |

---

## 5. Algorithms and Machine Learning Deep-Dive

### A. Convolutional Neural Networks (CNN) 
The project uses CNNs, which are the gold standard for image recognition. They automatically detect patterns (edges, textures, shapes) to identify complex objects like buildings.

### B. MobileNetV2 (Transfer Learning)
Instead of building a model from scratch, we used **Transfer Learning** with **MobileNetV2**.
-   **Architecture:** It uses "Bottleneck Inverted Residuals" and "Depthwise Separable Convolutions."
-   **Advantage:** It reduces the computational load (FLOPs) significantly, making it fast enough to run on mobile devices while maintaining high accuracy.
-   **Pre-training:** The model was pre-trained on the ImageNet dataset (1000 classes) to learn general visual features (lines, curves), which we then specialized for monuments.

### C. The Reliability Algorithm (Custom Logic)
To ensure the app doesn't give "hallucinated" or "random" results, I implemented a safety logic:
-   **Softmax Layer:** The final layer outputs a probability distribution across 10 classes.
-   **Confidence Threshold:** The result is only accepted if the top probability is higher than a specific threshold (e.g., 40%).
-   **Consistency Gap:** We compare the Top-1 result with the Top-2 result. If the gap is too small, the model is considered "confused," and the system smartly asks for a clearer image.

---

## 6. Detailed Feature List
### Web Interface
-   **User Dashboard:** Manage profile and view recent scans.
-   **Admin Panel:** Comprehensive dashboard to monitor users and trigger model retraining.
-   **Responsive Design:** Optimized for desktop, tablet, and mobile browsers.

### Mobile Application (Expo)
-   **Camera Integration:** Directly capture photos within the app.
-   **Real-time Results:** Fast inference over API.
-   **Map Integration:** One-tap navigation to the identified monument via Google Maps.
-   **Interactive UI:** Modern, cards-based design for displaying historical data.

---

## 7. Dataset and Training
The model is trained on **10 Classes** of prominent Indian monuments:
-   Ajanta Caves, Chhota Imambara, Alai Darwaza, Alai Minar, Basilica of Bom Jesus, Charminar, Golden Temple, Taj Mahal, Tanjavur Temple, Victoria Memorial.

**Data Augmentation steps used:**
-   **Rotation:** Handling tilted photos.
-   **Zooming:** Handling photos taken from different distances.
-   **Horizontal Flip:** Handling different camera orientations.

---

## 8. Key Libraries and Their Functions
-   **Django Rest Framework:** For creating the communication bridge between the Mobile App and Python Backend.
-   **React Navigation:** Manages the 'Stack' and 'Tab' navigation in the mobile app.
-   **Whitenoise:** Used to serve static assets directly from Django for faster loading.
-   **Scikit-learn:** Used for evaluating the model using Metrics like Accuracy, Precision, and Recall.

---

## 9. Interview Preparation: Potential Questions

**Q: Why use Python for the backend?**
*A: Python has the best ecosystem for AI and ML. Django allows for rapid development and has built-in security features like CSRF protection and a robust Admin panel.*

**Q: How do you handle cases where the user uploads an image of a dog?**
*A: I implemented a reliability check. If the model's confidence scores are low or the probabilities are spread too evenly across classes, the system returns an "Invalid Image" message instead of a wrong monument name.*

**Q: What is the benefit of Transfer Learning?**
*A: It allows us to achieve high accuracy with a smaller dataset. By reusing the knowledge (weights) from a model trained on millions of images, we only need to "fine-tune" the last layers for our specific monuments.*

**Q: How is the mobile app connected to the backend?**
*A: The mobile app makes an HTTP POST request to a Django endpoint (`/api_predict/`) with the image file. The backend processes the image, runs it through the model, and sends back a JSON response containing the name, confidence, and history.*
