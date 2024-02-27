let be_to_fe_dict = {
    'head_of_household' : 'Head Of Household',
    'first_name' : "First Name",
    'last_name' : "Last Name",
    'address' : "Address",
    'phone_number' : "Phone Number",
    'city' : "City",
    'zip' : "Zip",
    'family_members' : "Family Members",
    'good_neighbor' : "Good Neighbor",
    'item' : "Item",
    'quantity' : "Quantity",
    'country_of_origin' : "Country of Origin",
    'gender' : "Gender",
    'age' : "Age",
    'date_of_birth' : "Date of Birth",
    'date_of_arrival_to_us' : "Date of Arrival",
    'date_of_joining_oasis' : "Date Joined",
    'church_they_attend' : "Church Home",
    'donations_history' : 'Past Donations',
    'fulfilled' : "Fulfilled?",
    'completed' : "Completed?"

}

const translateBE = (word) => {
    return be_to_fe_dict[word] ? be_to_fe_dict[word] : word;
};

export default translateBE;