import mysql.connector
import json


# Define your database connection parameters
config = {
    'user': 'avnadmin',
    'port': 16031,
    'password': 'AVNS_wABtR6d4vmnUszOm4hC',
    'host': 'oasispractice-chrisspam1126-ece5.a.aivencloud.com',
    'database': 'oasis',
    'raise_on_warnings': True
}

try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Define the table creation query
    create_table_query = """
    CREATE TABLE notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    old_id VARCHAR(255),
    description TEXT,
    type VARCHAR(255),
    refugee_id INT,
    donator_id INT,
    family_id INT,
    user_id INT,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (refugee_id) REFERENCES refugees(refugee_id),
    FOREIGN KEY (donator_id) REFERENCES donators(donator_id),
    FOREIGN KEY (family_id) REFERENCES families(family_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)

)


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

