import { before, describe, it, mock } from "node:test";
import { CourseController } from "./course.controller.js"
import { CourseService } from "../services/course.service.js";
import { ExceptionService } from "../services/exception.service.js";
import assert from "assert";
import { GetCourseRequest } from "../requests/course/get-course.request.dto.js";

describe('Course Controller', () => {
    let courseController: CourseController;
    let exceptionService: ExceptionService;
    before(() => {
        exceptionService = new ExceptionService();
    });
    it('should return an array of courses', () => {
        const mockCourseServiceGet = {
            get: () => Promise.resolve([])
        }

        const fakeCourses = [{ name: 'Biology', capacity: 100, state: 'active' },
        { name: 'Chemistry', capacity: 100, state: 'active' },
        ];

        courseController = new CourseController(mockCourseServiceGet as unknown as CourseService, exceptionService);
        mock.method(mockCourseServiceGet, 'get', () => {
            return Promise.resolve(fakeCourses);
        });
        const request = new GetCourseRequest();
        return courseController.get(request).then((courses) => {
            assert.deepEqual(courses, fakeCourses);
        })
    });

});