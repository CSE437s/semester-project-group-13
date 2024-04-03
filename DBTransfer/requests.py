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
   CREATE TABLE requests (
        request_id INT AUTO_INCREMENT PRIMARY KEY,
        family_id INT, 
        old_id VARCHAR(255),
        item VARCHAR(255),
        amount INT,
        completed BOOLEAN,
        date DATE,
        user_id INT,
        FOREIGN KEY (family_id) REFERENCES families(family_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
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


