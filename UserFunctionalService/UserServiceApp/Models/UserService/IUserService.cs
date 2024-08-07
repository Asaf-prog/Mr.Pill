using MrPill.DTOs.DTOs;

namespace UserServiceApp.Models.UserService;

public interface IUserService
{
    public Task<bool> CreateNewMedication(string medicationBarcode, int phoneNumber, bool privatcy);
    public void UpdateMedication(MedicationDTO medicationDTO);
    public void DeleteMedication(int userPhoneNumber, int medicationId);
    public IEnumerable<MedicationDTO> GetAllMedicationByUserId(int phoneNumber, PrivacyStatus privacyStatus);
     public  Task<MedicationDTO> GetMedicationByBarcode(string medicationBarcode);
    public void SaveMassageToManagerHouseToAddNewUser(LoginComunicationDWrapper loginComunicationDWrapper);
    public int GetUserPhoneNumber(string token);
     public bool IsUserExistInDb(int PhoneNumber);
    public int GetPhoneNumberFromToken(string? token);
    public IEnumerable<UserDTO> GetAllUsersThatWantToBePartOfMyHome(int userPhoneNumer);
    public bool IsManager(int phoneNumber);
    public void InviteMemberToJoindMyHouse(int managerPhoneNumber, int phoneNumber);
}