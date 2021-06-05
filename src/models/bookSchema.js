//require mongoose

const mongoose = require('mongoose');

const { Schema } = mongoose;

//create a new instance of schema 

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["fantasy", "adventure", "romance", "contemporary", "dystopian", "mystery", "horror", "thriller",
            "paranormal", "historical fiction", "science fiction", "memoir", "cooking", "art",
            "biography", "development", "motivational", "health", "history", "travel", "guide", "family and relationships", "humor", "children",
            "comics", "classics", "literary fiction", "short stories", "women's fiction", "essays", "poetry", "self-help", "crime", "action", "alternate history",
            "anthology", "chick lit", "coming of age", "picture book", "political thriller", "satire", "suspense", "western", "young adult", "autobiography", "architecture",
            "business and economics", "crafts", "diary", "dictionary", "encyclopedia", "fitness", "home and garden", "journal", "math", "philosophy", "prayer", "true crime",
            "review", "science", "sports", " leisure", "fashion", "fable", "fairy tale", "legend", "magical realism", "fan fiction", "realistic fiction", "reference",
            "textbook", "periodicals"
        ]
    },
    publishingDate: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    numberOfPages: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    purchaseCount: { type: String, required: true },
}, { timestamps: true });

//make a model from the userSchema

const Book = mongoose.model("books", bookSchema);
module.exports = Book;