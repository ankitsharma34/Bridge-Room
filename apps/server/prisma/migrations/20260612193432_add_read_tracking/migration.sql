-- AlterTable
ALTER TABLE "RoomMember" ADD COLUMN     "lastReadAt" TIMESTAMP(3),
ADD COLUMN     "lastReadMessageId" TEXT;
