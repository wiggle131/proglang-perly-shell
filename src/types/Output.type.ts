
type ActualValue = {
  value: string;
  type: Number;
}

export type ParseOutput = {
  actualValue: ActualValue[];
  error: string;
}

export type ExecuteOutput = {
  output: string;
  status: Boolean;
}