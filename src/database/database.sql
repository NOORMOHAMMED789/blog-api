CREATE DATABASE blogs

CREATE TABLE blog (
    blog_id SERIAL PRIMARY KEY,        
    feature_image VARCHAR(255),        
    main_content TEXT NOT NULL,        
    blog_excerpt VARCHAR(255),        
    category VARCHAR(100),            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);
