from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

classifier = pipeline(
    "text-classification",
    model="fake_news_model",
    tokenizer="fake_news_model"
)

class NewsRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(news: NewsRequest):
    result = classifier(news.text)[0]
    label = "REAL" if result["label"] == "LABEL_1" else "FAKE"
    return {
        "prediction": label,
        "confidence": round(result["score"], 2)
    }

