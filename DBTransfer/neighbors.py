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

    # Define the table creation query with foreign key constraints
    create_table_query = """
    CREATE TABLE good_neighbors (
        NeighborID INT AUTO_INCREMENT PRIMARY KEY,
        RefugeeFamilyID INT,
        OldRefugeeFamilyID VARCHAR(255),
        FamilyID INT,
        OldFamilyID VARCHAR(255),
        Birthday DATE,
        Email VARCHAR(255),
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        Gender VARCHAR(255),
        PhoneNumber VARCHAR(20),
        Relation VARCHAR(255),
        is_head_of_house TINYINT(1),
        FOREIGN KEY (RefugeeFamilyID) REFERENCES families(family_id),
        FOREIGN KEY (FamilyID) REFERENCES families(family_id)
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
