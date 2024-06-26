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
    IsGoodNeighbor = False
    DesiresToBeGoodNeighbor = False
    FamilyName = family_data.get('familyName', '')
    Languages = family_data.get('languages', '')
    LatestDateAtOasis = family_data.get('latestDate', None)
    DateCreated = family_data.get('dateCreated', None)
    EnteredBy = family_data.get('enteredBy', '')
    Scheduled = family_data.get('scheduled', '')
    ArrivalDate = None
    CountryOfOrigin = family_data.get('CountryOfOrigin', '')
    
    # Extract address details
    address = ''
    zip_code = ''
    city = ''
    members = family_data.get('members', None)
    if members:
        if isinstance(members, dict):  # Check if members is an object (dictionary)
            address = members.get('headOfHouse', {}).get('address', '')
            zip_code = members.get('headOfHouse', {}).get('zip', '')
            city = members.get('headOfHouse', {}).get('city', '')
        elif isinstance(members, list):  # Check if members is an array (list)
            if members:
                head_of_house = members[0]
                address = head_of_house.get('address', '')
                zip_code = head_of_house.get('zip', '')
                city = head_of_house.get('city', '')

    # Execute the insert query
    cursor.execute(insert_query, (
        user_id, old_id, IsRefugeeFamily, IsOpenToHaveGoodNeighbor, IsGoodNeighbor,
        DesiresToBeGoodNeighbor, Languages, FamilyName, LatestDateAtOasis, DateCreated,
        ArrivalDate, EnteredBy, Scheduled, CountryOfOrigin, address, zip_code, city
    ))
    return cursor.lastrowid

# Rest of your code remains the same...


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
            old_id = family_id
            description = event_data.get('description', '')
            event_type = event_data.get('type', '')
            refugee_id = event_data.get('refugee_id', None)  # Adjust based on your data
            donator_id = event_data.get('donator_id', None)  # Adjust based on your data
            cursor.execute(insert_query, (
                date, old_id, description, event_type, refugee_id, donator_id, family_id, 1  # Assuming user_id is 1
            ))


def insert_donations(cursor, family_id, donations_data, old_id):
    # Define the insert query for donations
    insert_query = """
    INSERT INTO donations (
        family_id, old_id, item, amount, completed, date, user_id
    ) VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    # Insert each donation into the database
    if isinstance(donations_data, dict):
        for donation_id, donation_data in donations_data.items():
            if donation_data is not None:  # Skip None values
                family_id = family_id
                old_id = old_id
                item = donation_data.get('item', "")
                amount = donation_data.get('amount', 0)
                completed = donation_data.get('completed', False)
                date = donation_data.get('date', None)
                user_id = 1
                try:
                    cursor.execute(insert_query, (
                        family_id, old_id, item, amount, completed, date, user_id
                    ))
                except mysql.connector.Error as err:
                    if err.errno == 1264:  # Check for 'Out of range' error
                        cursor.execute(insert_query, (
                            family_id, old_id, item, None, completed, date, user_id
                        ))
                    else:
                        print("Error:", err)
                        
    elif isinstance(donations_data, list):
        for donation_data in donations_data:
            if donation_data is not None:  # Skip None values
                family_id = family_id
                old_id = old_id
                item = donation_data.get('item', "")
                amount = donation_data.get('amount', 0)
                completed = donation_data.get('completed', False)
                date = donation_data.get('date', None)
                user_id = 1
                try:
                    cursor.execute(insert_query, (
                        family_id, old_id, item, amount, completed, date, user_id
                    ))
                except mysql.connector.Error as err:
                    if err.errno == 1264:  # Check for 'Out of range' error
                        cursor.execute(insert_query, (
                            family_id, old_id, item, None, completed, date, user_id
                        ))
                    else:
                        print("Error:", err)



def insert_members(cursor, family_id, members_data, old_id):
    # Define the insert query for members
    insert_query = """
    INSERT INTO donators (
        is_head_of_house, family_id, old_id,
        address, phone_number, birthday, city, first_name, last_name,
        gender, relation_to_head, zip_code, email
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    # Extract head of household data
    head_of_house_data = members_data.get('headOfHouse', {})
    # Insert head of household into the database
    is_head_of_house = True
    address = head_of_house_data.get('address', '')
    phone_number = head_of_house_data.get('phoneNum', '')  # Adjust the key for phone number
    birthday = head_of_house_data.get('birthdate', None)  # Adjust the key for birthday
    city = head_of_house_data.get('city', '')
    first_name = head_of_house_data.get('firstName', '')
    last_name = head_of_house_data.get('lastName', '')
    gender = head_of_house_data.get('gender', 'N/A')
    relation_to_head = head_of_house_data.get('relation', 'Head Of House')  # Adjust the key for relation to head
    zip_code = head_of_house_data.get('zip', '')  # Adjust the key for zip code
    email = head_of_house_data.get('email', '')  # Adjust the key for email (not available in the provided data)
    cursor.execute(insert_query, (
        is_head_of_house, family_id, old_id,
        address, phone_number, birthday, city, first_name, last_name,
        gender, relation_to_head, zip_code, email
    ))
    
    # Iterate over additional members (0, 1, 2, etc.)
    for member_key, member_data in members_data.items():
        if member_key.isdigit():  # Check if the key is a digit (indicating an additional member)
            is_head_of_house = False
            address = member_data.get('address', '')
            phone_number = member_data.get('phoneNum', '')  # Adjust the key for phone number
            birthday = member_data.get('birthdate', None)  # Adjust the key for birthday
            city = member_data.get('city', '')
            first_name = member_data.get('firstName', '')
            last_name = member_data.get('lastName', '')
            gender = member_data.get('gender', '')
            relation_to_head = member_data.get('relation', '')  # Adjust the key for relation to head
            zip_code = member_data.get('zip', '')  # Adjust the key for zip code
            email = head_of_house_data.get('email', '')  # Adjust the key for email (not available in the provided data)
            cursor.execute(insert_query, (
                is_head_of_house, family_id, old_id,
                address, phone_number, birthday, city, first_name, last_name,
                gender, relation_to_head, zip_code, email
            ))


try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    insert_count = 0

    # Read data from the JSON file
    with open('oasisdonators.json') as f:
        json_data = json.load(f)

        # Insert data into the families and donators table
        for family_id, family_data in json_data.items():
            # Insert family into families table
            inserted_family_id = insert_family(cursor, family_data, family_id)
            
            # Insert members into donators table
            if 'members' in family_data:
                insert_members(cursor, inserted_family_id, family_data['members'], family_id)
            else:
                print("No members data found for family_id:", family_id)

            # Insert events into events table
            if 'events' in family_data:
                insert_events(cursor, inserted_family_id, family_data['events'], family_id)
            else:
                print("No events data found for family_id:", family_id)

            # Insert donations into donations table
            if 'donations' in family_data:
                insert_donations(cursor, inserted_family_id, family_data['donations'], family_id)
            else:
                print("No donations data found for family_id:", family_id)

            insert_count += 1
            print("Total entries inserted:", insert_count)

        # Commit changes and close the cursor and connection
        cnx.commit()
        cursor.close()
        cnx.close()
        print("Data inserted successfully.")
except mysql.connector.Error as err:
    print("Error:", err)
