import mysql.connector
import json


# Define your database connection parameters
config = {
    'user': 'avnadmin',
    'port': 13780,
    'password': 'AVNS_UugTJpwoWZiGpP6VjcA',
    'host': 'oasisdb-oasisdb.a.aivencloud.com',
    'database': 'oasis',
    'raise_on_warnings': True
}

try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Define the table creation query
    create_table_query = """
    CREATE TABLE refugees (
    refugee_id INT AUTO_INCREMENT PRIMARY KEY,
    arrival_date DATE,
    country VARCHAR(255),
    date_created DATE,
    last_name VARCHAR(255),
    languages TEXT,
    latest_date_at_oasis DATE,
    family_id INT,
    is_head_of_house ENUM('yes', 'no'),
    address VARCHAR(255),
    old_id VARCHAR(255),
    zip VARCHAR(20),
    city VARCHAR(255),
    state VARCHAR(255),
    birthday DATE,
    first_name VARCHAR(255),
    gender ENUM('Male', 'Female', 'Other'),
    relation_to_head VARCHAR(255),
    phone VARCHAR(20),
    user_id_who_created INT,
    FOREIGN KEY (family_id) REFERENCES families(family_id),
    FOREIGN KEY (user_id_who_created) REFERENCES users(user_id)
);

    """

    # Execute the table creation query
    cursor.execute(create_table_query)

    # Commit changes and close the cursor and connection
    cnx.commit()
    cursor.close()
    cnx.close()
    print("Table created successfully.")
except mysql.connector.Error as err:
    print("Error:", err)
