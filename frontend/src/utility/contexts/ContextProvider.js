import DonationContext from "./Donations";
import FamilyContext from "./Families";
import GoodNeighborContext from "./GoodNeighbors";
import RefugeeContext from "./Refugees";
import DonatorContext from "./Donators";
import UserContext from "./Users";
import RequestContext from "./Requests";
import NoteContext from "./Notes"

export const ContextProvider = (type) => {
  switch (type) {
    case "refugee":
      return RefugeeContext;
    case "family":
      return FamilyContext;
    case "donation":
      return DonationContext;
    case "neighbor":
      return GoodNeighborContext;
    case "donator":
      return DonatorContext;
    case "request":
      return RequestContext;
    case "note":
      return NoteContext;
    case "user":
    case "admin":
      return UserContext;
    default:
      throw new Error(`Unsupported context type: ${type}`);
  }
};

export function getDisplayString(context, data) {
  let displayString = "";
  switch(context.type){
    case 'refugee':
    case 'donator':
    case 'user':
    case 'admin':
      displayString = `${data.first_name} ${data.last_name}`
      break;
    case 'family':
      displayString = `${data.FamilyName}`
      break;
    case 'donation':
    case 'request':
      displayString = `${data.item} (${data.amount})`
      break;
    case 'neighbor':
      displayString = `${data.FirstName} ${data.LastName}`
      break;
    case 'note':
      displayString = `${data.type}`
    default:
      console.log("Invalid Display String :", data);
  }
  return displayString
}

export function getAllContexts(){
  return {
    refugee: RefugeeContext,
    donator: DonatorContext,
    family: FamilyContext,
    donation: DonationContext,
    neighbor: GoodNeighborContext,
    user: UserContext,
    admin: UserContext,
    request:RequestContext,
    note: NoteContext
  }
}



