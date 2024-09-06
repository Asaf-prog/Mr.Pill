using MrPill.DTOs.DTOs;

namespace UserServiceApp.Models.UserService;

public interface IUserService
{
    public Task<bool> CreateNewMedication(string medicationBarcode, int phoneNumber, bool privatcy, string medicineCabinetName);
    public void UpdateMedicationPills( UpdateMedicationDTO updateMedication);
    public void UpdateDateMedication( UpdateDateMedicationDTO updateDateMedication);
    public void DeleteMedication(int userPhoneNumber, int medicationId, string medicineCabinetName);
    public IEnumerable<MedicationDTO> GetAllMedicationByUserId(int phoneNumber, string medicineCabinetName);
    public IEnumerable<MedicationDTO> GetAllMedication(int userPhoneNumer);
     public  Task<MedicationDTO> GetMedicationByBarcode(string medicationBarcode);
    public void SaveMassageToManagerHouseToAddNewUser(LoginComunicationDWrapper loginComunicationDWrapper);
    public int GetUserPhoneNumber(string token);
    public bool IsUserExistInDb(int PhoneNumber);
    public int GetPhoneNumberFromToken(string? token);
    public bool NameAlreadyExistInMyInventory(string Name, int phoneNumber);
    public void CreateNewMedicineCabinet(string name, int phoneNumber);
    public IEnumerable<MedicineCabinetDTO> GetAllMedicineCabinets(int userPhoneNumer);
    public IEnumerable<UserDTO> GetAllMedicineCabinetUsers(int userPhoneNumer, int cabinetId);
    public void RemoveMemberFromHouse(int userPhoneNumber, int targetPhoneNumber, int cabinetId);
}