import { Router, Request } from 'express';
import multer from 'multer';
import path from 'node:path';
import { requireAdmin } from '../../middlewares/requireAdmin';

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, path.resolve('server', 'uploads')),
    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/[^\w.\-]+/g, '-');
      cb(null, `${Date.now()}-${safeName}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

function publicUrl(req: Request, fileName: string) {
  return `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
}

export const uploadsRouter = Router();

uploadsRouter.post('/', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required.' });

  res.status(201).json({
    url: publicUrl(req, req.file.filename),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});
