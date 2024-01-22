import Navbar from "@/components/Navbar";

function page() {
  return (
    <div className="min-w-screen min-h-screen bg-deepblue">
      <Navbar />
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { content: true },
  };
  const { username } = res.data;

  if (res.data.found === "true") {
    const resLight = await axios.get("http://localhost:3000/api/streetlight", {
      params: { id: streetLightId },
    });

    const { foundLight } = resLight.data;

    return {
      props: { content: "true", username, userId, foundLight },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default page;
