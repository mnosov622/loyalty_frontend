const Page = async ({ params }: any) => {
  const userData = await fetch(`http://localhost:5000/users/${params.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return (
    <div className="shadow p-3">
      <h1>
        {userData?.firstName} {userData?.lastName}
      </h1>
      <p>{userData?.email}</p>
    </div>
  );
};

export default Page;
