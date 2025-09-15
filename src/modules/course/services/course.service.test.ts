import { before, beforeEach, describe, it, mock } from "node:test";
import { CourseService } from "./course.service.js"
import { CourseFactory } from "../factories/course.factory.js"
import { Course } from "../models/course.js";
import assert from 'node:assert';


describe('Course Service', () => {
    let courseService: CourseService;

    it('should return an array of courses', () => {
        const mockCourseFactoryGet = {
            get: () => Promise.resolve([]),
        };


        courseService = new CourseService(mockCourseFactoryGet as unknown as CourseFactory);
        const mockCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),
            new Course({ id: 2, name: 'Chemistry', capacity: 100, state: 'active' }),

        ];
        mock.method(mockCourseFactoryGet, 'get', () => {
            return Promise.resolve(mockCourses);
        });
        return courseService.get(15, 0).then((courses) => {
            assert.deepEqual(courses, mockCourses)
        });
    });

      it('should return an array of courses', () => {
        const mockCourseFactoryInsert = {
            insert: () => Promise.resolve([]),
        };


        courseService = new CourseService(mockCourseFactoryInsert as unknown as CourseFactory);
        const mockCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),

        ];
        mock.method(mockCourseFactoryInsert, 'insert', () => {
            return Promise.resolve(mockCourses);
        });
        return courseService.insert('Biology', 100, 'active').then((courses) => {
            assert.deepEqual(courses, mockCourses)
        });
    });


      it('should return an array of courses', () => {
        const mockCourseFactoryUpdateName = {
            updateName: () => Promise.resolve([]),
        };


        courseService = new CourseService(mockCourseFactoryUpdateName as unknown as CourseFactory);
        const mockCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),

        ];
        mock.method(mockCourseFactoryUpdateName, 'updateName', () => {
            return Promise.resolve(mockCourses);
        });
        return courseService.updateName('Math', 'Biology').then((courses) => {
            assert.deepEqual(courses, mockCourses)
        });
    });

})