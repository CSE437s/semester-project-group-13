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
    IsRefugeeFamily = False
    IsOpenToHaveGoodNeighbor = False
    IsGoodNeighbor = True
    DesiresToBeGoodNeighbor = False
    FamilyName = family_data.get('familyName', '')
    Languages = family_data.get('languages', '')
    LatestDateAtOasis = family_data.get('latestDate', None)
    DateCreated = family_data.get('dateCreated', None)
    EnteredBy = family_data.get('enteredBy', '')
    Scheduled = family_data.get('scheduled', '')
    ArrivalDate = family_data.get('arrival', None) 
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
    return cursor.lastrowid



def insert_events(cursor, family_id, events_data, old_id):
    # Define the insert query for events
    insert_query = """
    INSERT INTO notes (
        date, old_id, description, type, refugee_id, donator_id, family_id, user_id
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    # Insert each event into the database
    if isinstance(events_data, dict):
        for event_id, event_data in events_data.items():
            date = event_data.get('date', None)
            description = event_data.get('description', '')
            event_type = event_data.get('type', '')
            refugee_id = event_data.get('refugee_id', None)  # Adjust based on your data
            donator_id = event_data.get('donator_id', None)  # Adjust based on your data
            cursor.execute(insert_query, (
                date, old_id, description, event_type, refugee_id, donator_id, family_id, 1  # Assuming user_id is 1
            ))
    elif isinstance(events_data, list):
        for event_data in events_data:
            date = event_data.get('date', None)
            description = event_data.get('description', '')
            event_type = event_data.get('type', '')
            refugee_id = event_data.get('refugee_id', None)  # Adjust based on your data
            donator_id = event_data.get('donator_id', None)  # Adjust based on your data
            cursor.execute(insert_query, (
                date, old_id, description, event_type, refugee_id, donator_id, family_id, 1  # Assuming user_id is 1
            ))



def insert_neighbor(cursor, family_id, member_data, paired_data, oldFamilyID):
    # Define the insert query for refugees
    insert_query = """
    INSERT INTO good_neighbors (
        is_head_of_house, OldRefugeeFamilyID, FamilyID, OldFamilyID, Birthday, Email,
        FirstName, LastName, Gender, PhoneNumber, Relation
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    OldRefugeeID = paired_data
    # Extract head of household data
    head_of_house_data = member_data.get('headOfHouse', {})
    last_name_head = head_of_house_data.get('lastName', '')
    is_head_of_house_head = True
    birthday_head = head_of_house_data.get('birthdate', None)
    email_head = head_of_house_data.get('email', "")
    first_name_head = head_of_house_data.get('firstName', '')
    gender_head = head_of_house_data.get('gender', '')
    relation_to_head_head = head_of_house_data.get('relation', '')
    phone_head = head_of_house_data.get('phoneNum', '')

    # Execute the insert query for head of household
    cursor.execute(insert_query, (
        is_head_of_house_head, OldRefugeeID, family_id, oldFamilyID, birthday_head, email_head,
        first_name_head, last_name_head, gender_head, phone_head, relation_to_head_head
    ))

    # Iterate through each member (excluding head of household)
    for member_key, member_data in member_data.items():
        if member_key.isdigit():  # Check if the key is a digit (indicating an additional member)
            last_name = member_data.get('lastName', '')
            is_head_of_house = False
            OldRefugeeID = paired_data
            email = member_data.get('email', "")
            birthday = member_data.get('birthdate', None)
            first_name = member_data.get('firstName', '')
            gender = member_data.get('gender', '')
            relation_to_head = member_data.get('relation', '')
            phone = member_data.get('phoneNum', '')

            # Execute the insert query for additional members
            cursor.execute(insert_query, (
                is_head_of_house, OldRefugeeID, family_id, oldFamilyID, birthday, email,
                first_name, last_name, gender, phone, relation_to_head
            ))


try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    insert_count = 0

    # Read data from the JSON file
    with open('oasisneighbors.json') as f:
        json_data = json.load(f)

        # Insert data into the families and refugees table
        for family_id, family_data in json_data.items():
            
            # Insert family into families table
            inserted_family_id = insert_family(cursor, family_data, family_id)
            
            # Insert members into refugees table
            if 'members' in family_data:
                insert_neighbor(cursor, inserted_family_id, family_data['members'], family_data['pairedFamily'], family_id)

            if 'events' in family_data:
                insert_events(cursor, inserted_family_id, family_data['events'], family_id)
        # Commit changes and close the cursor and connection
            insert_count += 1
            print("Total entries inserted:", insert_count)
        cnx.commit()
        cursor.close()
        cnx.close()
        print("Data inserted successfully.")
except mysql.connector.Error as err:
    print("Error:", err)
