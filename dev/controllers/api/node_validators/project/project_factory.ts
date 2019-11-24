/**
 * @fileoverview
 * Contains factory methods for easily building a ProjectValidator.
 */

import { ProjectValidator, ProjectResponseData } from './project';
import { v4 as uuid } from 'uuid';

/**
 * **INTENDED FOR TESTING**  
 * Returns a ProjectValidator created with the provided data.
 * If a property is missing from the data param, a valid value will be randomly
 * generated in its place.
 * @param data A partial or complete ProjectResponseData object.
 */
export function buildProjectValidator(
  data: Partial<ProjectResponseData> = {}
): ProjectValidator {
  const stubID = Math.ceil(Math.random() * 1000000);
  const stubUUID = uuid();
  const stubbedData: ProjectResponseData = {
    id: stubID,
    uuid: stubUUID,
    display_title: `Project - ${stubID}`,
    url_title: `project_${stubID}`,
    description: `A sample description for project id: ${stubID}`,
    thumb_device_small: `thumb_${stubID}_small.png`,
    thumb_device_medium: `thumb_${stubID}_medium.png`,
    thumb_device_large: `thumb_${stubID}_large.png`,
    tools: []
  };

  const finalData = {...stubbedData, ...data};

  return new ProjectValidator(finalData);
}