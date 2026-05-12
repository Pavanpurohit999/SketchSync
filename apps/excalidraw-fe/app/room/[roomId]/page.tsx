import RoomCanvas from "@/components/RoomCanvas";

const page = async ({ params }: { params: { roomId: string } }) => {
  const roomId = (await params).roomId;

  return <RoomCanvas roomId={roomId} />;
};

export default page;
