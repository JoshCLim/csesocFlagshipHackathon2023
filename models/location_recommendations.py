import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import json
import requests


def get_preferences():
    url = "http://localhost:8000/locations"
    response = requests.get(url)
    if response.status_code == 201:
        locations = response.json()
        return locations
    else:
        print("Error: Failed to retrieve the locations.")
        return None


def data_ingestion():
    data = {
        'attraction': ['Sydney Opera House', 'Bondi Beach', 'The Rocks', 'Royal Botanic Garden Sydney', 'Sydney Harbour Bridge', 'Darling Harbour', 'Taronga Zoo', 'Blue Mountains', 'Hunter Valley Gardens', 'Jenolan Caves'],
        'food': [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
        'nature': [0, 1, 0, 1, 0, 0, 0, 1, 1, 1],
        'adventure': [0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
        'culture': [1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        'exercise': [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        'tourist_hotspot': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        'cozy': [0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
        'family': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        'wildlife': [0, 1, 0, 1, 0, 0, 1, 1, 0, 1], 
        'near_cbd': [1, 0, 1, 1, 1, 1, 0, 0, 0, 0], 
        'disabled_accessibility': [1, 1, 1, 1, 0, 1, 1, 0, 0, 0]
    }
    data = pd.DataFrame(data)
    return data


def data_to_json(data):
    json_data = data.to_json()
    return json_data


class UserBasedCollaborativeFiltering:
    def __init__(self, json_data):
        df = pd.read_json(json_data)
        self.data = df.set_index("attraction")
        self.user_similarity = cosine_similarity(self.data)

    def get_similar_users(self, user_id, top_n=5):
        user_scores = list(enumerate(self.user_similarity[user_id]))
        user_scores = sorted(user_scores, key=lambda x: x[1], reverse=True)
        similar_users = [user for user, _ in user_scores[1:top_n+1]]

        return similar_users


if __name__ == "__main__":
    data = data_ingestion()
    json_data = data_to_json(data)
    filtering = UserBasedCollaborativeFiltering(json_data)
    place_id = len(data) - 1
    similar_users = filtering.get_similar_users(place_id)
    counter = 1
    for value in similar_users:
        print(
            f"The place that is {counter} similar to {place_id} has id: {value}")
        counter += 1
