import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from ultralytics import YOLO

class YOLOv6:
    '''
    Using the Object Detection Model YOLOv6 to help us get the detection results. 
    '''
    def __init__(self, model_type = "small"):
        self.model = None
        self.model_type = model_type
        
    def load_model(self):
        self.model = YOLO("yolov6n.yaml")  # build new model from scratch
        self.model.info()  # display model information
    
    def predict(self, img_path):
        output = self.model.predict("img_path")
        print(output)

class ItemBasedCollaborativeFiltering:
    '''
    CSESoc Flagship Hackathon. 
    We utilised Collaborative Filtering for items to attain the top recommendations for a user. 
    '''
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.item_similarity = cosine_similarity(self.data.T)
       
    def get_similar_items(self, item_id, top_n=5):
        '''
        Input: 
            item_id: 
            top_n: The top recommended results (default = 5)
        Output:
            similar_items: 
        '''
        item_scores = list(enumerate(self.item_similarity[item_id]))
        item_scores = sorted(item_scores, key=lambda x: x[1], reverse=True)
        similar_items = [item for item, _ in item_scores[1:top_n+1]]
        return similar_items
    
    def get_recommendations(self, user_id, top_n=5):
        user_ratings = self.data.loc[user_id].tolist()
        unrated_items = [i for i, rating in enumerate(user_ratings) if pd.isnull(rating)]
        item_scores = []
        
        for item_id in unrated_items:
            similar_items = self.get_similar_items(item_id)
            rating_sum = 0
            weight_sum = 0
            
            for similar_item in similar_items:
                if not pd.isnull(user_ratings[similar_item]):
                    rating_sum += user_ratings[similar_item] * self.item_similarity[item_id, similar_item]
                    weight_sum += self.item_similarity[item_id, similar_item]
            
            if weight_sum > 0:
                item_scores.append((item_id, rating_sum / weight_sum))
        
        item_scores = sorted(item_scores, key=lambda x: x[1], reverse=True)
        recommended_items = [item for item, _ in item_scores[:top_n]]
        return recommended_items

class UserBasedCollaborativeFiltering:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.user_similarity = cosine_similarity(self.data)
    
    def get_similar_users(self, user_id, top_n=5):
        user_scores = list(enumerate(self.user_similarity[user_id]))
        user_scores = sorted(user_scores, key=lambda x: x[1], reverse=True)
        similar_users = [user for user, _ in user_scores[1:top_n+1]]
        return similar_users

# Usage for ItemBasedCollaborativeFiltering
filtering = ItemBasedCollaborativeFiltering('ratings.csv')
user_id = 1
recommendations = filtering.get_recommendations(user_id)
print(f"Recommended items for user {user_id}:")
for item in recommendations:
    print(item)
    
# Usage for UserBasedCollaborativeFiltering
filtering = UserBasedCollaborativeFiltering('ratings.csv')
user_id = 1
similar_users = filtering.get_similar_users(user_id)
print(f"Most similar users to user {user_id}:")
for user in similar_users:
    print(user)
