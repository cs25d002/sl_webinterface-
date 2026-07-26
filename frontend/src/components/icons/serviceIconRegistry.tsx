import {
  Activity,
  FilePenLine,
  FileText,
  HelpCircle,
  ScanText,
  ShieldCheck,
  Stethoscope,
  type LucideIcon
} from 'lucide-react';

const serviceIconRegistry: Record<string, LucideIcon> = {
  'file-pen-line': FilePenLine,
  stethoscope: Stethoscope,
  'shield-check': ShieldCheck,
  'scan-text': ScanText,
  'file-text': FileText,
  activity: Activity
};

const DEFAULT_SERVICE_ICON: LucideIcon = HelpCircle;

export function getServiceIcon(iconId: string): LucideIcon {
  return serviceIconRegistry[iconId] ?? DEFAULT_SERVICE_ICON;
}
