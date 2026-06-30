import User from "@/models/User";

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function findUserById(id: string) {
  return User.findById(id);
}

export async function updateUser(id: string, data: Record<string, unknown>) {
  return User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
}
