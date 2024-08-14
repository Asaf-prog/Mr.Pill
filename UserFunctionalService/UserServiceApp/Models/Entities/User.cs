namespace UserServiceApp.Models;
public class User
{
    public int UserId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public int PhoneNumber { get; set; }
    public int MedicineCabinetUsersId { get; set; }
    public MedicineCabinetUsers? MedicineCabinetUser { get; set; }
    public ICollection<MedicineCabinetUsers>? MedicineCabinetUsersList { get; set; }
}