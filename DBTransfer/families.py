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
    drop_table_query = "DROP TABLE IF EXISTS families"
    cursor.execute(drop_table_query)

    # Re-enable foreign key checks
    cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

    # Define the table creation query
    create_table_query = """
    CREATE TABLE families (
        family_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        old_id VARCHAR(255),
        IsRefugeeFamily TINYINT(1),
        IsOpenToHaveGoodNeighbor TINYINT(1),
        IsGoodNeighbor TINYINT(1),
        DesiresToBeGoodNeighbor TINYINT(1),
        Languages VARCHAR(255),
        FamilyName VARCHAR(255),
        LatestDateAtOasis DATE,
        DateCreated DATE,
        ArrivalDate DATE,
        CountryOfOrigin VARCHAR(100),
        EnteredBy VARCHAR(255),
        Scheduled VARCHAR(255),
        address VARCHAR(255),
        zip_code VARCHAR(10),
        city VARCHAR(255)
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
