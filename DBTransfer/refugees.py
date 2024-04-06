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
    CREATE TABLE refugees (
        refugee_id INT AUTO_INCREMENT PRIMARY KEY,
        last_name VARCHAR(255),
        family_id INT,
        is_head_of_house bool,
        birthday DATE,
        first_name VARCHAR(255),
        gender VARCHAR(255),
        relation_to_head VARCHAR(255),
        phone VARCHAR(20),
        is_deleted BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (family_id) REFERENCES families(family_id)
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
