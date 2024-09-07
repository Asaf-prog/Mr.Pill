import axios, { AxiosResponse } from "axios";
import DataHandler from "./DataHandler";

// change if need
const BASE_URL = "http://20.217.66.65:"
const SERVER_AND_CLIENT_ON_SAME_MACHINE = false;

// do not change
const BASE_URL_LOCAL = "http://10.0.2.2:" // android emulator and server running on same machine
const URL = SERVER_AND_CLIENT_ON_SAME_MACHINE ? BASE_URL_LOCAL : BASE_URL;

let request = {
    method: "",
    url: "",
    headers: {}, 
    data: {}
};

let lastRequestTime: number;
let lastRequestType: string;

let response: AxiosResponse<any, any>;
let parsedResponse: any;

function createRequest(requestType: string) {

    const user = DataHandler.getUser();

    switch (requestType) {

        case "login":
            request = {
                method: 'post',
                url: URL + "5181/Mr-Pill/Login",
                headers: { "Content-Type": "application/json" }, 
                data: {
                    "PhoneNumber": user.PhoneNumber,
                }
            }; return;

        case "verifyLogin":
            request = {
                method: 'post',
                url: URL + "5181/Mr-Pill/ValidateCode",
                headers: { "Content-Type": "application/json" }, 
                data: {
                    "PhoneNumber": user.PhoneNumber,
                    "Code": DataHandler.getState('validationCode'),
                }
            }; return;

        case "signup":
            request = {
                method: 'post',
                url: URL + "5181/Mr-Pill/GenerateRegistrationCode",
                headers: { }, 
                data: {
                    PhoneNumber: user.PhoneNumber,
                }
            }; return;
        
        case "verifySignup":
            request = {
                method: 'post',
                url: URL + "5181/Mr-Pill/Register",
                headers: { }, 
                data: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    PhoneNumber: user.PhoneNumber,
                    Code: DataHandler.getState('validationCode')
                }
            }; return;
        
        case "getAllPills":
            request = {
                method: 'get',
                url: URL + "5194/user/all/medications",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.Token,
                }, 
                data: {}
            }; return;

        case "getPills":
            request = {
                method: 'get',
                url: URL + "5194/user/medications?medicineCabinetName=" + DataHandler.getState("medicineCabinetName"),
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.Token,
                }, 
                data: {}
            }; return;

        case "addPill":

            request = {
                method: 'post',
                url: URL + "5194/medications?medicineCabinetName=" + DataHandler.getState('medicineCabinetName'),
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {
                    MedicationBarcode: DataHandler.getState('medicationBarcode'),
                    Privacy: DataHandler.getFlag("privatePill"),
                }
            }; return;

        case "getMyCabinets":
            request = {
                method: 'get',
                url: URL + "5194/user/cabinet",
                headers: {
                    "Authorization": "Bearer " + user.Token, 
                },
                data: {}
            }; return;

        case "addCabinet":
            request = {
                method: 'post',
                url: URL + "5194/medicine-cabinet?Name=" + DataHandler.getState("medicineCabinetName"),
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {}
            }; return;

        case "getMyReminders":
            request = {
                method: 'get',
                url: URL + "5195/Reminders",
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {}
            }; return;

        case "getMyRemindersToday":
            request = {
                method: 'get',
                url: URL + "5195/Reminders/today",
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {}
            }; return;

        case "addReminder":
            request = {
                method: 'post',
                url: URL + "5195/SetReminder",
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: DataHandler.get('reminder'),
            
            }; return;

        case "addPersonToCabinet":
            request = {
                method: 'post',
                url: `${URL}5181/Mr-Pill/joined-new-house?targetPhoneNumber=${DataHandler.getState("targetPhoneNumber")}&medicineCabinetName=${DataHandler.getState("medicineCabinetName")}`,
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {},
            }; return;

        case "getCabinetMembers":
            request = {
                method: 'get',
                url: URL + "5194/users/cabinet?cabinetId=" + DataHandler.get('cabinet').id,
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {},
            }; return;

        case "getNotifications":
            request = {
                method: 'get',
                url: URL + "5181/get-notifications",
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {},
            }; return;

        case "respondToJoinCabinetRequest":
            request = {
                method: 'put',
                url: URL + "5181/handle-notification?requestId=" + DataHandler.get('notification').id + "&approve=" + DataHandler.getFlag('userResponse'),
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {},
            }; return;
        
        case "updatePill":
            request = {
                method: 'put',
                url: URL + "5194/medications/update",
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {
                    Amount: DataHandler.getState("pillAmount"),
                    MedicationId: DataHandler.getState("pillId"),
                },
            }; return;
        
        case "deletePill":
            request = {
                method: 'delete',
                url: URL + "5194/medications/" + DataHandler.getState("pillId") + "?medicineCabinetName=" + DataHandler.getState("medicineCabinetName"),
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {
                },
            }; return;

        case "updatePillDate":
            request = {
                method: 'put',
                url: URL + "5194/update/medication/date",
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {
                    MedicationId: DataHandler.getState("pillId"),
                    MedicationNewDate: DataHandler.getState("pillDate")
                },
            }; return;

        case "removeMember":
            request = {
                method: 'delete',
                url: URL + "5194/cabinet/user/remove-member?targetToRemovePhoneNumber=" + DataHandler.getState("targetPhone") + "&cabinetId=" + DataHandler.getState("cabinetId"),
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {
                },
            }; return;

        case "deleteReminder":
            request = {
                method: 'delete',
                url: URL + "5195/DeleteReminder?Id=" + DataHandler.getState("reminderId"),
                headers: {
                    "Authorization": "Bearer " + user.Token,
                },
                data: {
                },
            }; return;
    

        default:
            console.error("Invalid request type");
    }
}

export default {
    async sendRequest(requestType: string) {
        
        const timeNow = Date.now();
        if (lastRequestTime && lastRequestType && lastRequestType === requestType && timeNow - lastRequestTime < 1000)
            return; // prevent rapid repeated requests

        lastRequestType = requestType;
        lastRequestTime = timeNow;

        try {
            axios.defaults.validateStatus = function () {
                return true;
            };

            createRequest(requestType);

            response = await axios(request);
            
            if (response.request.status == 200) {
                parsedResponse = JSON.parse(response.request._response);
                return true;
            } else if (response.request.status == 401) {
                if (requestType != "verifySignup" && requestType != "verifyLogin") {
                    DataHandler.expireSession();
                }
                return false;
            } else {
                console.log(response.request.status);
                return false;
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
            response = {} as AxiosResponse<any,any>
            return false;
        }
    },

    getRequest() {
        return request;
    },
    getResponse() {
        return response;
    },
    getParsedResponse() {
        return parsedResponse;
    }
};
