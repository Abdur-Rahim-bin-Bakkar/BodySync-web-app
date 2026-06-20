import { getServerSession } from "@/lib/session/server";
import ApplyTrainerForm from "./ApplyTrainerForm";
import { getTrainerApplication } from "@/lib/api/getTrainerApplication";

const ApplyTrainerPage = async () => {
  const session = await getServerSession();

  // উদাহরণ: DB থেকে check করবে user already applied কিনা
  const isApplied = await getTrainerApplication(session?.user?.id) // replace with real API later
  // console.log(session?.user?.id,'jdk')
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Apply as Trainer
      </h1>

      <ApplyTrainerForm
        isApplied={isApplied}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default ApplyTrainerPage;