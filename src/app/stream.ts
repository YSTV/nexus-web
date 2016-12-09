import { JsonObject, JsonMember } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Stream {
  @JsonMember
  id: number;

  @JsonMember
  name: string;

  @JsonMember({name: 'is_public'})
  isPublic: boolean;

  @JsonMember({name: 'starts_at'})
  startAt: string;

  @JsonMember({name: 'ends_at'})
  endAt: string;
}

