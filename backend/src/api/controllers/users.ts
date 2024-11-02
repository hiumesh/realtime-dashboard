import {
  FindUsersRequest,
  GetPreSignedUrlRequest,
  UpdateUserRoleRequest,
} from "@/types/api/requests";
import {
  handleControllerError,
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/response";
import { getS3PreSignedUrl } from "@/utils/s3";
import { Request, Response } from "express";
import { generateUniqueFileName } from "@/utils/helpers";
import {
  countAllUsers,
  findAllUsers,
  getUserById,
  updateRole,
} from "../services/users";
import db from "@/db";
import { getNotifications } from "../services/notifications";

export async function getUsers(req: FindUsersRequest, res: Response) {
  try {
    const users = await findAllUsers({
      page: req.query.page,
      pageSize: req.query.page_size,
      db: db,
    });

    const count = await countAllUsers(db);

    sendSuccessResponse({
      res,
      status: 200,
      message: "Users fetched",
      data: {
        data: users,
        pageCount: count
          ? Math.ceil(
              count / (req.query.page_size ? Number(req.query.page_size) : 20)
            )
          : undefined,
      },
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const user = await getUserById({ userId: req?.user?.user_id, db: db });

    const data = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    sendSuccessResponse({
      res,
      status: 200,
      message: "Profile fetched successfully",
      data,
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}

export async function getPreSignedUrl(
  req: GetPreSignedUrlRequest,
  res: Response
) {
  try {
    const { file_name, file_type } = req.body;
    const key = generateUniqueFileName(file_name);
    const url = await getS3PreSignedUrl(key, file_type);

    sendSuccessResponse({
      res,
      status: 200,
      message: "Pre-signed URL generated successfully",
      data: { key, url },
    });
  } catch (error) {
    sendErrorResponse({
      res,
      status: 500,
      message: "Internal server error",
      error,
    });
  }
}

export async function updateUserRole(
  req: UpdateUserRoleRequest,
  res: Response
) {
  try {
    console.log(req.body);
    const { user_id, role } = req.body;
    await updateRole({ userId: user_id, role, db: db });
    sendSuccessResponse({
      res,
      status: 200,
      message: "User role updated successfully",
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}

export async function getUserNotifications(req: Request, res: Response) {
  try {
    const notifications = await getNotifications({
      userId: req?.user?.user_id,
      db: db,
    });
    sendSuccessResponse({
      res,
      status: 200,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}
