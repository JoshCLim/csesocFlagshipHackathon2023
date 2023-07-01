import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import requests
import json

'''
This script is: 
1. Calling the PyTorch model
2. Getting the vector of what's inside the photo 
3. Aggregating the value 
4. Using recommendation system to get the people most similar to the person uploading the photos! 
'''

def data_ingestion():
    data = pd.DataFrame({'user_id': [0, 1, 2, 3, 1, 3],
                        'item1': [5, 2, 1, 4, 1, 3],
                        'item2': [4, 4, 2, 3, 2, 3],
                        'item3': [3, 5, 4, 2, 3, 3],
                        'item4': [1, 2, 5, 1, 3, 3]})
    data = data.groupby('user_id').mean()
    json_data = data.to_json()
    return json_data

class UserBasedCollaborativeFiltering:
    def __init__(self, json_data):
        self.data = pd.read_json(json_data)
        self.user_similarity = cosine_similarity(self.data)
    
    def get_similar_users(self, user_id, top_n=5):
        user_scores = list(enumerate(self.user_similarity[user_id])) 
        user_scores = sorted(user_scores, key=lambda x: x[1], reverse=True)
        similar_users = [user for user, _ in user_scores[1:top_n+1]]
        
        return similar_users
    
def get_userid():
    userid=1
    return userid

# Call PyTorch Model 
def image_classification():
    return None

if __name__ == "__main__":
    json_data = data_ingestion()
    filtering = UserBasedCollaborativeFiltering(json_data)
    user_id = get_userid()
    similar_users = filtering.get_similar_users(user_id)
    
    counter = 1
    for person in similar_users: 
        print(f"The person who is {counter} similar has userid: {person}")
        counter += 1
    
    
     
    