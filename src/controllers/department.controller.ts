import { Request, Response } from "express";
import { generateApiKey } from "../utils";
import { Department } from "../models";

export async function createDepartment(req: Request, res: Response) {
  const { departmentName, apiKey, contact } = req.body;

  console.log(req.body);

  const DTO = {
    departmentName,
    apiKey: apiKey || generateApiKey(),
    contact: {
      ...contact,
      additionalInfo: Array.isArray(contact.additionalInfo) // convert additioal info to array if its not an array
        ? contact.additionalInfo
        : [contact.additionalInfo],
    },
  };

  const departmentInfo = await Department.create(DTO);

  return res.status(201).send({
    status: "success",
    message: "Department created succcessfully",
    data: departmentInfo,
  });
}

export async function updateDepartment(req: Request, res: Response) {
  let { departmentName, apiKey, contact, departmentId } = req.body;

  const DTO = {
    departmentName,
    apiKey: apiKey || generateApiKey(),
    contact: {
      ...contact,
      additionalInfo: Array.isArray(contact.additionalInfo) // convert additioal info to array if its not an array
        ? contact.additionalInfo
        : [contact.additionalInfo],
    },
  };

  await Department.updateOne({ _id: departmentId }, DTO);
  const departmentInfo = await Department.findById(departmentId);

  return res.status(200).send({
    status: "success",
    message: "Department updated succcessfully",
    data: departmentInfo,
  });
}

export async function deleteDepartment(req: Request, res: Response) {
  const { departmentId } = req.body;

  await Department.deleteOne({ _id: departmentId });

  return res.status(200).send({
    status: "success",
    message: "Department deleted succcessfully",
  });
}

export async function viewAllDepartments(req: Request, res: Response) {
  const departments = await Department.find().sort({ createdAt: -1 }).lean();

  return res.status(200).send({
    status: "success",
    message: "Fetched departments successfully",
    data: departments,
  });
}

export async function viewSingleDepartment(req: Request, res: Response) {
  const { departmentId } = req.params;

  /**
   * Find department by _id or apiKey
   */

  const department = await Department.findOne({
    $or: [{ _id: departmentId }, { apiKey: departmentId as string }],
  });

  if (!department)
    return res
      .status(400)
      .send({ status: "error", message: "Department not found" });

  return res.status(200).send({
    status: "success",
    message: "Fetched department info successfully",
    data: department,
  });
}

export async function searchThroughDepartments(req: Request, res: Response) {
  const { q } = req.query;

  /**
   * We'll leverage on mongodb text search functionality here
   *
   * We are searching based on the departmentName or apiKey
   */

  const departments = await Department.find({
    $or: [
      { departmentName: { $regex: q as string, $options: "$i" } },
      { apiKey: q as string },
    ],
  });

  return res.status(200).send({
    status: "success",
    message: "Fetched conversations",
    data: departments,
  });
}
