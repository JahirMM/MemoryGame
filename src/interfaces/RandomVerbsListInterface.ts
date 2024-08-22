interface VerbForms {
  present: string;
  past: string;
  pastParticiple: string;
  presentParticiple: string;
  thirdPersonSingular: string;
}

export interface RandomVerbsListInterface {
  verb: string;
  forms: VerbForms;
}
