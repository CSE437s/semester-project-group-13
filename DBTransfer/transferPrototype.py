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


with open('oasisprotoypes.json') as f:
    data = json.load(f)

# Establish a connection to the database
cnx = mysql.connector.connect(**config)
cursor = cnx.cursor()

# Define the insert query
insert_query = """
INSERT INTO prototypes (city, country, event_type, item, relationship)
VALUES (%s, %s, %s, %s, %s)
"""

# Iterate over the data and insert into the table
for city_id, city_name in data['cities'].items():
    cursor.execute(insert_query, (city_name, None, None, None, None))

for country_id, country_name in data['countries'].items():
    cursor.execute(insert_query, (None, country_name, None, None, None))

for event_id, event_type in data['eventType'].items():
    cursor.execute(insert_query, (None, None, event_type, None, None))

for item_id, item_name in data['itemList'].items():
    cursor.execute(insert_query, (None, None, None, item_name, None))

for relationship in data['relationships']:
    cursor.execute(insert_query, (None, None, None, None, relationship))

# Commit changes and close the cursor and connection
cnx.commit()
cursor.close()
cnx.close()