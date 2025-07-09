import { describe, it, mock, after, before, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { DatabaseService } from "../services/database.service.js";
import { CourseFactory } from "./course.factory.js";
import { Course } from "../models/course.js";

describe('Course Factory', () => {
    let databaseService: DatabaseService;
    let courseFactory: CourseFactory;

    before(() => {
        databaseService = new DatabaseService({
            database: '',
            host: '',
            password: '',
            user: '',
        });
        courseFactory = new CourseFactory(databaseService);
    });


    it('should return an array of courses', () => {
        const mockCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),
            new Course({ id: 2, name: 'Chemistry', capacity: 100, state: 'active' }),

        ];
        mock.method(databaseService, 'execute', () => {
            return Promise.resolve(mockCourses);
        });
        return courseFactory.get(15, 0).then((courses) => {
            assert.deepEqual(courses, mockCourses);
        });

    });

    it('should return an array of courses', () => {
        const mockCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),
        ];
        mock.method(databaseService, 'execute', () => {
            return Promise.resolve(mockCourses);
        });
        return courseFactory.insert('Biology', 100, 'active').then((courses) => {
            assert.deepEqual(courses, mockCourses);
        });
    });

    it('should return an array of courses', () => {
        const mockCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),
        ];
        mock.method(databaseService, 'execute', () => {
            return Promise.resolve(mockCourses);
        });
        return courseFactory.updateName('Biology', 'Math').then((courses) => {
            assert.deepEqual(courses, mockCourses);
        })
    })

    // afterEach(() => { });

    // after(() => { })
});