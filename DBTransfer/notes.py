import mysql.connector

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

    # Drop foreign key constraint in the notes table if it exists
    drop_constraint_query = "ALTER TABLE notes DROP FOREIGN KEY notes_ibfk_1"
    cursor.execute(drop_constraint_query)

    # Drop the existing refugees table if it exists
    drop_table_query = "DROP TABLE IF EXISTS refugees"
    cursor.execute(drop_table_query)

    # Define the table creation query
    create_table_query = """
    CREATE TABLE refugees (
        refugee_id VARCHAR(255) PRIMARY KEY,  
        last_name VARCHAR(255),
        family_id INT,
        is_head_of_house TINYINT(1),
        birthday DATE,
        first_name VARCHAR(255),
        gender VARCHAR(255),
        relation_to_head VARCHAR(255),
        phone VARCHAR(20),
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
