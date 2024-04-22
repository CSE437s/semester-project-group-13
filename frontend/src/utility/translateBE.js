let be_to_fe_dict = {
  head_of_household: "Head Of Household",
  is_head_of_house: "Head of House?",
  first_name: "First Name",
  FirstName: "First Name",
  last_name: "Last Name",
  LastName: "Last Name",
  FamilyName: "Family Name",
  address: "Address",
  phone_number: "Phone Number",
  PhoneNumber: "Phone Number",
  city: "City",
  zip: "Zip",
  family_members: "Family Members",
  good_neighbor: "Good Neighbor",
  item: "Item",
  quantity: "Quantity",
  country_of_origin: "Country of Origin",
  CountryOfOrigin: "Country of Origin",
  gender: "Gender",
  age: "Age",
  date_of_birth: "Date of Birth",
  date_of_arrival_to_us: "Date of Arrival",
  date_of_joining_oasis: "Date Joined",
  Birthday: "Date of Birth",
  birthday: "Date of Birth",
  ArrivalDate: "Date of Arrival",
  DateCreated: "Date Joined",
  LatestDateAtOasis: "Last Seen",
  IsRefugeeFamily: "Refugee Family?",
  IsGoodNeighbor: "Matched?",
  IsOpenToHaveGoodNeighbor: "Open to Good Neighbor Pairing?",
  DesiresToBeGoodNeighbor: "Eligible Good Neighbor?",
  church_they_attend: "Church Home",
  donations_history: "Past Donations",
  fulfilled: "Fulfilled?",
  completed: "Completed?",
  is_refugee: "Refugee Family",
  is_good_neighbor: "Eligible Good Neighbor",
  0: "No",
  1: "Yes",
  giving_family: "Given By (Family)",
  giving_volunteer: "Given By (Member)",
  receiving_family: "Received By (Family)",
  receiving_refugee: "Received By (Member)",
  match_date: "Match Date",
  host_family_id: "Host Family",
  refugee_family_id: "Refugee Family",
  RefugeeFamilyID: "Refugee Family",
  family_id: "Family",
  FamilyID: "Host Family"

};

function isValidDateFormat(dateString) {
  // Regex to match the 'YYYY-MM-DDTHH:MM:SS.MSZ' (sql format)
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return regex.test(dateString);
}

const translateBE = (word) => {
  if (isValidDateFormat(word)) {
    const formattedDate = new Date(word);
    return formattedDate.toDateString();
  }
  return be_to_fe_dict[word] ? be_to_fe_dict[word] : word;
};

export default translateBE;
