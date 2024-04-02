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


def insert_family(cursor, family_data, old_id):
    # Define the insert query for families
    insert_query = """
    INSERT INTO families (
        user_id, old_id, IsRefugeeFamily, IsOpenToHaveGoodNeighbor, IsGoodNeighbor,
        DesiresToBeGoodNeighbor, Languages, FamilyName, LatestDateAtOasis, DateCreated,
        ArrivalDate, EnteredBy, Scheduled, CountryOfOrigin, address, zip_code, city
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    # Extract family data
    user_id = 1
    old_id = old_id
    IsRefugeeFamily = True
    IsOpenToHaveGoodNeighbor = True if family_data.get('comfortableGN', '').lower() == 'yes' else False
    IsGoodNeighbor = False
    DesiresToBeGoodNeighbor = False
    FamilyName = family_data.get('familyName', '')
    Languages = family_data.get('languages', '')
    LatestDateAtOasis = family_data.get('latestDate', None)
    DateCreated = family_data.get('dateCreated', None)
    EnteredBy = family_data.get('enteredBy', '')
    Scheduled = family_data.get('scheduled', '')
    ArrivalDate = family_data.get('arrival', '') 
    CountryOfOrigin = family_data.get('country', '')
    members = family_data['members']
    if isinstance(members, dict):  # Check if members is an object (dictionary)
        address = members.get('headOfHouse', {}).get('address', '')
        zip_code = members.get('headOfHouse', {}).get('zip', '')
        city = members.get('headOfHouse', {}).get('city', '')
    else:
        address = ''
        zip_code = ''
        city = ''

    # Execute the insert query
    cursor.execute(insert_query, (
        user_id, old_id, IsRefugeeFamily, IsOpenToHaveGoodNeighbor, IsGoodNeighbor,
        DesiresToBeGoodNeighbor, Languages, FamilyName, LatestDateAtOasis, DateCreated,
        ArrivalDate, EnteredBy, Scheduled, CountryOfOrigin, address, zip_code, city
    ))

def insert_refugee(cursor, family_id, member_data):
    # Define the insert query for refugees
    insert_query = """
    INSERT INTO refugees (
        last_name, family_id, is_head_of_house, birthday,
        first_name, gender, relation_to_head, phone
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    # Extract head of household data
    head_of_house_data = member_data.get('headOfHouse', {})
    last_name_head = head_of_house_data.get('lastName', '')
    is_head_of_house_head = True
    birthday_head = head_of_house_data.get('birthdate', None)
    first_name_head = head_of_house_data.get('firstName', '')
    gender_head = head_of_house_data.get('gender', '')
    relation_to_head_head = head_of_house_data.get('relation', '')
    phone_head = head_of_house_data.get('phoneNum', '')

    # Execute the insert query for head of household
    cursor.execute(insert_query, (
        last_name_head, family_id, is_head_of_house_head, birthday_head,
        first_name_head, gender_head, relation_to_head_head, phone_head
    ))

    # Iterate through each member (excluding head of household)
    for member_key, member_data in member_data.items():
        if member_key.isdigit():  # Check if the key is a digit (indicating an additional member)
            last_name = member_data.get('lastName', '')
            is_head_of_house = False
            birthday = member_data.get('birthdate', None)
            first_name = member_data.get('firstName', '')
            gender = member_data.get('gender', '')
            relation_to_head = member_data.get('relation', '')
            phone = member_data.get('phoneNum', '')

            # Execute the insert query for additional members
            cursor.execute(insert_query, (
                last_name, family_id, is_head_of_house, birthday,
                first_name, gender, relation_to_head, phone
            ))


try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Read data from the JSON file
    with open('smallerRefugees.json') as f:
        json_data = json.load(f)

        # Insert data into the families and refugees table
        for family_id, family_data in json_data.items():
            
            # Insert family into families table
            inserted_family_id = insert_family(cursor, family_data, family_id)
            
            # Insert members into refugees table
            if 'members' in family_data:
                insert_refugee(cursor, inserted_family_id, family_data['members'])

        # Commit changes and close the cursor and connection
        cnx.commit()
        cursor.close()
        cnx.close()
        print("Data inserted successfully.")
except mysql.connector.Error as err:
    print("Error:", err)
