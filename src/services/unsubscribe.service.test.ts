import { describe, it, mock } from "node:test";
import { UnsubscribeService } from "./unsubscribe.service.js";
import assert from "assert";
import { StudentService } from "./student.service.js";
import { CourseService } from "./course.service.js";
import { StudentHasCourseService } from "./student-has-course.service.js";
import { Course } from "../models/course.js";
import { StudentHasCourse } from "../models/student-has-course.js";
import { Student } from "../models/student.js";
import { DatabaseService } from "./database.service.js";

describe('Unsubscribe Service', () => {
    let unsubscribeService: UnsubscribeService;
    it('should return an array of Student Has Course', () => {
        const mockStudentService = {
            getManyByEmail: () => Promise.resolve([]),
            getAll: () => Promise.resolve([]),
            getById: () => Promise.resolve([]),
            getByEmail: () => Promise.resolve([]),
            get: () => Promise.resolve([]),
            getByName: () => Promise.resolve([]),
            insert: () => Promise.resolve([]),
            updateName: () => Promise.resolve([]),
            updateEmail: () => Promise.resolve([]),
            delete: () => Promise.resolve([]),
        };
        const mockCourseService = {
            getManyByName: () => Promise.resolve([]),
        };
        const mockStudentHasCourseService = {
            updateState: () => Promise.resolve([]),
        };
        const mockPool = {
            getConnection: () => Promise.resolve(mockConnection),
        };
        const mockDataBaseService = {
            getPool: () => mockPool,
        };

        const mockConnection = {
            beginTransaction: () => Promise.resolve(),
            commit: () => Promise.resolve(),
            rollback: () => Promise.resolve(),
            release: () => Promise.resolve(),
        };


        unsubscribeService = new UnsubscribeService(
            mockStudentService as unknown as StudentService, // This is solved with interfaces
            mockCourseService as unknown as CourseService,
            mockStudentHasCourseService as unknown as StudentHasCourseService,
            mockDataBaseService as unknown as DatabaseService);

        // FIXTURES

        const fakeCourses: Course[] = [
            new Course({ id: 1, name: 'Biology', capacity: 100, state: 'active' }),
            new Course({ id: 2, name: 'Chemistry', capacity: 100, state: 'active' }),
        ];

        const fakeStudents: Student[] = [
            new Student({ id: 1, name: 'Ana', email: 'ana@test.com' }),
            new Student({ id: 2, name: 'Luis', email: 'luis@test.com' })
        ];

        const fakeStudentHasCourses: StudentHasCourse[] = [
            new StudentHasCourse({ studentId: 1, courseId: 1, state: 'inactive' }),
            new StudentHasCourse({ studentId: 1, courseId: 2, state: 'inactive' }),
            new StudentHasCourse({ studentId: 2, courseId: 1, state: 'inactive' }),
            new StudentHasCourse({ studentId: 2, courseId: 2, state: 'inactive' }),

        ];

        const fakeEmails: string[] = [
            'ana@test.com',
            'luis@test.com',
        ];

        const fakeNames: string[] = [
            'Biology',
            'Chemistry',
        ]

        mock.method(mockStudentService, 'getManyByEmail', () => {
            return Promise.resolve(fakeStudents);
        });
        mock.method(mockCourseService, 'getManyByName', () => {
            return Promise.resolve(fakeCourses);
        });


        let counter = 0;

        mock.method(mockStudentHasCourseService, 'updateState', () => {
            const result = fakeStudentHasCourses[counter];
            counter++;
            return Promise.resolve(result);
        })
        mock.method(mockDataBaseService, 'getPool', () => {
            return mockPool;
        });
        mock.method(mockPool, 'getConnection', () => {
            return Promise.resolve(mockConnection);
        });
        mock.method(mockConnection, 'beginTransaction', () => {
            return Promise.resolve();
        });
        mock.method(mockConnection, 'commit', () => {
            return Promise.resolve();
        });
        mock.method(mockConnection, 'rollback', () => {
            return Promise.resolve();
        });
        mock.method(mockConnection, 'release', () => {
            return Promise.resolve();
        });

        return unsubscribeService.unsubscribeMany(fakeEmails, fakeNames)
            .then((studentHasCourses) => {
                assert.deepEqual(studentHasCourses, fakeStudentHasCourses)
            });
    });
});