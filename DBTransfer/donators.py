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

    # Temporarily disable foreign key checks
    cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

    # Drop the existing table if it exists
    drop_table_query = "DROP TABLE IF EXISTS donators"
    cursor.execute(drop_table_query)

    # Re-enable foreign key checks
    cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

    # Define the table creation query
    create_table_query = """
    CREATE TABLE donators (
        donator_id INT AUTO_INCREMENT PRIMARY KEY,
        is_head_of_house TINYINT(1),
        family_id INT,
        address VARCHAR(255),
        phone_number VARCHAR(15),
        birthday DATE,
        city VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        gender VARCHAR(255),
        relation_to_head VARCHAR(255),
        zip_code VARCHAR(10),
        email VARCHAR(255),
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
