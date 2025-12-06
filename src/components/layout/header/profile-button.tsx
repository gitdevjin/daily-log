import defaultAvatar from "@/assets/default-avatar.jpg";
export default function ProfileButton() {
  return (
    <div>
      {" "}
      <img className="h-6" src={defaultAvatar} alt="" />
    </div>
  );
}
